const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

// ✅ Checkout Session Route
router.post("/checkout", async (req, res) => {
  const { email, user_id, price_id } = req.body;

  console.log("🔁 Incoming request body:", req.body);
  console.log("📧 Email:", email);
  console.log("🆔 User ID:", user_id);
  console.log("💰 Price ID from req.body:", price_id);
  console.log(
    "💰 Price ID from .env:",
    process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
  );

  if (!email || !user_id) {
    return res.status(400).json({ error: "Missing email or user_id" });
  }
  console.log(
    "✅ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Final resolvedPriceId:",
    resolvedPriceId,
  );
  const resolvedPriceId = price_id || process.env.STRIPE_PRO_MONTHLY_PRICE_ID;

  if (!resolvedPriceId) {
    return res.status(400).json({ error: "Missing Stripe price ID" });
  }

  const sessionParams = {
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price: resolvedPriceId, // ✅ THIS is the key line
        quantity: 1,
      },
    ],
    metadata: {
      supabase_user_id: user_id,
      email,
    },
    success_url: `${process.env.FRONTEND_URL}/dashboard?status=success`,
    cancel_url: `${process.env.FRONTEND_URL}/dashboard?status=cancel`,
  };

  console.log("📦 Stripe sessionParams:", sessionParams);

  try {
    const session = await stripe.checkout.sessions.create(sessionParams);
    console.log("✅ Stripe session created:", session.id);
    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Stripe Checkout Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Billing Portal Route
router.post("/create-portal-session", async (req, res) => {
  const { email } = req.body;

  try {
    const customers = await stripe.customers.list({ email, limit: 1 });

    if (!customers.data.length) {
      return res.status(404).json({ error: "No Stripe customer found." });
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: `${process.env.FRONTEND_URL}/dashboard`,
    });

    res.json({ url: portalSession.url });
  } catch (err) {
    console.error("❌ Failed to create billing portal session:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Export once — at the very bottom
module.exports = router;
