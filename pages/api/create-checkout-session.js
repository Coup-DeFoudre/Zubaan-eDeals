const stripe = require('stripe')('sk_test_51NrEO7SDr0bHNnIP5STa38O5GPJ9jZu08AdS2eNfqI2ECnT12NDuETaxhapMhPnoXQIqeumIgOuDz85Zsd23RW9C00PzJqdWf2');

export default async (req, res) => {
  const { subTotal } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Total',
          },
          unit_amount: subTotal * 100,  // Convert subTotal to cents (Stripe requires amount in cents)
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.headers.origin}/order`,
    cancel_url: `${req.headers.origin}/checkout`,
  });

  res.json({ id: session.id });
};

