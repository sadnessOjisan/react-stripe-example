import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: "2020-08-27",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const value = req.body.amount;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: value,
    currency: "jpy",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });
  res.status(200).json({ client_secret: paymentIntent.client_secret });
};
