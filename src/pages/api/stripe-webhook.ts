import { type NextApiRequest, type NextApiResponse } from "next";
import { env } from "../../env/server.mjs";
import { type Stripe } from "stripe";
import { stripeClient } from "../../server/stripe/client.js";
import { buffer } from "micro";
import {
  handleInvoicePaid,
  handleSubscriptionCanceled,
  handleSubscriptionCreatedOrUpdated,
} from "../../server/stripe/stripe-webhook-handlers.js";
import { prisma } from "../../server/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).send("Method not allowed");
    return;
  }

  const signature = req.headers["stripe-signature"] as string;
  const buf = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripeClient.webhooks.constructEvent(buf, signature, webhookSecret);

    if (event.type === "invoice.paid") {
      await handleInvoicePaid({ event, stripe: stripeClient, prisma });
    } else if (event.type === "customer.subscription.created") {
      await handleSubscriptionCreatedOrUpdated({ event, prisma });
    } else if (event.type === "customer.subscription.updated") {
      await handleSubscriptionCreatedOrUpdated({ event, prisma });
    } else if (event.type === "customer.subscription.deleted") {
      //Handle the event
      await handleSubscriptionCanceled({ event, prisma });
    } else if (event.type === "invoice.payment_failed") {
      //TODO: send email to the user that the payment failed
    } else {
      res.status(400).send(`Webhook Error: Unhandled event type ${event.type}`);
    }

    await prisma.stripeEvent.create({
      data: {
        id: event.id,
        type: event.type,
        api_version: event.api_version,
        object: event.object,
        created: new Date(event.created * 1000),
        data: {
          object: event.data.object,
          previous_attributes: event.data.previous_attributes,
        },
        livemode: event.livemode,
        pending_webhooks: event.pending_webhooks,
        request: {
          id: event.request?.id,
          idempotency_key: event.request?.idempotency_key,
        },
      },
    });

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    console.log(err);
  }
}
