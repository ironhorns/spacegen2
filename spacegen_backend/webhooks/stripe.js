const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");
const {
  sendMail,
  generateProSubscriptionEmail,
  generateDowngradeEmail,
} = require("../utils/mailer");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Supabase client setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    console.log("✅ Stripe webhook received");
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error("❌ Webhook verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const session = event.data.object;

    // ✅ Log event to webhook_logs
    try {
      await supabase.from("webhook_logs").insert([
        {
          event_type: event.type,
          payload: session,
        },
      ]);
      console.log(`📘 Logged event: ${event.type}`);
    } catch (err) {
      console.error("❌ Failed to log webhook:", err.message);
    }

    // ✅ Handle subscription success
    if (event.type === "checkout.session.completed") {
      const userId = session.metadata?.supabase_user_id;
      const email =
        session.customer_email ||
        session.customer_details?.email ||
        "unknown@example.com";

      if (userId) {
        // Upgrade user to Pro
        const { error: updateError } = await supabase
          .from("users")
          .update({ role: "pro" })
          .eq("id", userId);

        if (updateError) {
          console.error("❌ Failed to update user role:", updateError.message);
        } else {
          console.log(`✅ Upgraded user ${userId} to Pro`);
        }

        // Save subscription record
        const { error: insertError } = await supabase
          .from("subscriptions")
          .insert([
            {
              email,
              user_id: userId,
              amount: session.amount_total || 0,
              stripe_subscription_id: session.subscription,
              stripe_session_id: session.id,
              status: "active",
              created_at: new Date().toISOString(),
            },
          ]);

        if (insertError) {
          console.error(
            "❌ Failed to insert subscription:",
            insertError.message,
          );
        } else {
          console.log("✅ Subscription saved");
          console.log("📧 Attempting to send email to:", email);

          const { subject, html } = generateProSubscriptionEmail(
            email,
            session.amount_total || 0,
            session.subscription,
            session.id,
          );

          try {
            await sendMail(email, subject, html);
            console.log("✅ Email sent");
          } catch (mailErr) {
            console.error("❌ Email failed:", mailErr.message);
          }
        }
      } else {
        console.warn("⚠️ No supabase_user_id in session");
      }
    }
    const { type, data } = event;
    // ✅ Handle downgrades
    if (type === "customer.subscription.deleted") {
      const subscription = data.object;
      const customerId = subscription.customer;

      console.log("🔻 Subscription canceled for Stripe customer:", customerId);

      try {
        // Get customer details to fetch email and metadata
        const customer = await stripe.customers.retrieve(customerId);
        const userEmail = customer.email;
        const userId = customer.metadata?.supabase_user_id;

        // ✅ Downgrade user in Supabase
        const { error: roleErr } = await supabase
          .from("users")
          .update({ role: "free" })
          .eq("id", userId);

        if (roleErr) {
          console.error("❌ Failed to downgrade user:", roleErr.message);
          return res.status(500).send("Role downgrade failed.");
        }

        console.log(`✅ Downgraded user ${userId} (${userEmail}) to Free`);

        // 📧 Send downgrade email
        const { subject, html } = generateDowngradeEmail(userEmail);

        try {
          await sendMail(userEmail, subject, html);
          console.log("📧 Downgrade email sent to", userEmail);
        } catch (emailErr) {
          console.error("❌ Downgrade email failed:", emailErr.message);
        }

        return res.status(200).send("Downgrade handled.");
      } catch (err) {
        console.error("❌ Error handling subscription.deleted:", err.message);
        return res.status(500).send("Failed to process downgrade.");
      }
    }
    // ✅ Handle other events

    res.status(200).json({ received: true });
  },
);

module.exports = router;
