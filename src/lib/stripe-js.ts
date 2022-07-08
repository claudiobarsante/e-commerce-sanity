/*using stripe sdk on the client side
-- install yarN add @stripe/stripe-js
 */
import { loadStripe } from '@stripe/stripe-js';

export async function getStripe() {
  const stripeJs = await loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  return stripeJs;
}
