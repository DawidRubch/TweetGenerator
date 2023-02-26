import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { getOrCreateStripeCustomerIdForUser } from "../../stripe/stripe-webhook-handlers";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const PAYMENT_VALUES = ["5", "10", "15"] as const;

const priceMap: Record<(typeof PAYMENT_VALUES)[number], string> = {
  5: env.STRIPE_5USD_PRICE_ID,
  10: env.STRIPE_10USD_PRICE_ID,
  15: env.STRIPE_15USD_PRICE_ID,
};

export const paymentsRouter = createTRPCRouter({
  createCheckoutSession: protectedProcedure
    .input(z.object({ price: z.enum(PAYMENT_VALUES) }))
    .mutation(async ({ input, ctx }) => {
      const { stripe, session, prisma, req } = ctx;

      const customerId = await getOrCreateStripeCustomerIdForUser({
        prisma,
        stripe,
        userId: session.user?.id,
      });

      if (!customerId) {
        throw new Error("Could not create customer");
      }

      const baseUrl =
        env.NODE_ENV === "development"
          ? `http://${req.headers.host}`
          : `https://${req.headers.host}`;

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: customerId,
        client_reference_id: session.user?.id,
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price: priceMap[input.price],
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/generate-tweets`,
        cancel_url: `${baseUrl}/pricing`,
        subscription_data: {
          metadata: {
            userId: session.user?.id,
          },
        },
      });

      if (!checkoutSession) {
        throw new Error("Could not create checkout session");
      }

      return {
        checkoutUrl: checkoutSession.url,
      };
    }),
});
