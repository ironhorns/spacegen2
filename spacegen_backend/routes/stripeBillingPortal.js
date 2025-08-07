// routes/stripeBillingPortal.js

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const supabase = require("../supabaseClient");

router.post("/", async (req, res) => {
  const { userId } = req.body;

  // Fetch Stripe Subscription ID from DB
  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("stripe_subscription_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !subscription) {
    return res.status(400).json({ error: "Subscription not found." });
  }

  // Lookup Stripe Subscription → Get customer ID
  const stripeSub = await stripe.subscriptions.retrieve(
    subscription.stripe_subscription_id,
  );

  const customerId = stripeSub.customer;

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: "https://spacegen-ai.com/dashboard",
  });

  res.json({ url: session.url });
});

module.exports = router;
