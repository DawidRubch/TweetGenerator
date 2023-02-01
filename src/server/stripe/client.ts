import Stripe from "stripe";
import { env } from "../../env/server.mjs";

export const stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
