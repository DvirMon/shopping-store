const stripe = require('stripe')(process.env.STRIPE_KEY);

const checkout = async () => {

  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://localhost:4200',
    cancel_url: 'https://localhost:4200',
  });
}

module.exports = {
  checkout
}