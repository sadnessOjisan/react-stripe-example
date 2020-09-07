// import { NextApiRequest, NextApiResponse } from 'next'
// import Stripe from 'stripe'

// const stripe = new Stripe(process.env.STRIPE_SECRET, { apiVersion: '2020-08-27' })

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: 1099,
//         currency: 'jpy',
//         // Verify your integration in this guide by including this parameter
//         metadata: { integration_check: 'accept_a_payment' },
//     });
//     console.log(paymentIntent)
//     res.status(200).json({ client_secret: paymentIntent.client_secret })
// }