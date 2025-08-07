// routes/stripePortal.js

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const { customer_id } = req.body;

  if (!customer_id) {
    return res.status(400).json({ error: "Missing customer_id" });
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: "http://localhost:5173/dashboard", // Update for production
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Billing Portal Error:", err.message);
    res.status(500).json({ error: "Failed to create billing portal session" });
  }
});

module.exports = router;
