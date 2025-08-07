const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // use service role key
);

router.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error("Webhook Error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Only handle successful payment events
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata?.supabase_user_id;

      if (!userId) {
        console.error("Missing supabase_user_id in metadata.");
        return res.status(400).end();
      }

      // Update user's role in Supabase
      const { error } = await supabase
        .from("users")
        .update({ role: "pro" })
        .eq("id", userId);

      if (error) {
        console.error("Supabase update error:", error.message);
        return res.status(500).end();
      }

      console.log(`✅ Upgraded user ${userId} to Pro.`);
    }

    res.status(200).json({ received: true });
  },
);

module.exports = router;
