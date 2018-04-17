var stripe = require("stripe")("sk_test_U4JFsjzSHPBZVJ0W01SzHuzx");

const charge = stripe.charges.create({
  amount: 999,
  currency: 'usd',
  source: 'tok_visa',
  receipt_email: 'jenny.rosen@example.com',
});


