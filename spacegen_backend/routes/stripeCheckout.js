// backend/routes/stripeCheckout.js

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
require("dotenv").config();

router.post("/", async (req, res) => {
  const { email, user_id } = req.body;

  if (!email || !user_id) {
    return res.status(400).json({ error: "Missing email or user_id" });
  }

  try {
    // Look for an existing customer by email or create a new one
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customer = customers.data[0];

    if (!customer) {
      customer = await stripe.customers.create({ email });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRO_MONTHLY_PRICE_ID, // replace with your price ID
          quantity: 1,
        },
      ],
      metadata: {
        supabase_user_id: user_id, // <-- ensure this is set
        supabase_user_id: user_id,
        email,
      },
      success_url: "http://localhost:5173/dashboard?success=true",
      cancel_url: "http://localhost:5173/dashboard?canceled=true",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe Checkout Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
