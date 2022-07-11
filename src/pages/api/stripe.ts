import { CartProductType } from 'context/cart/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getErrorMessage } from 'lib/getError';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    console.log('request', JSON.stringify(req.body));

    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1LIakNG5gxMlocmAGYBaaAOn' },
          { shipping_rate: 'shr_1LIamLG5gxMlocmAUYxvjxP8' }
        ],
        line_items: req.body.map((item: CartProductType) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              'image-',
              `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/`
            )
            .replace('-webp', '.webp');

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImage]
              },
              unit_amount: item.price * 100 // unit amount has to be in cents(so multiply by 100)
            },
            //   adjustable_quantity: {
            //     enabled: true,
            //     minimum: 1
            //   },
            quantity: item.quantity
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(500).json(getErrorMessage(err));
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
