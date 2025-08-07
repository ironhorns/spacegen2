const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const supabase = require("../supabaseClient");
const sendMail = require("../utils/mailer");

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const session = event.data.object;

    // 🔹 Log webhook
    try {
      await supabase.from("webhook_logs").insert([
        {
          event_type: event.type,
          payload: session,
        },
      ]);
      console.log(`📘 Logged webhook event: ${event.type}`);
    } catch (logError) {
      console.error("❌ Failed to log webhook:", logError.message);
    }

    // ✅ Handle checkout.session.completed
    if (event.type === "checkout.session.completed") {
      const userId = session.metadata?.supabase_user_id;
      console.log("emaillllllllllllllllllll" + session.customer_email);
      const email =
        session.customer_email ||
        session.customer_details?.email ||
        session.metadata?.email || // fallback
        "unknown@example.com";
      console.log("emaillllllllllllllllllll" + email);
      if (!email && session.customer) {
        try {
          const customer = await stripe.customers.retrieve(session.customer);
          email = customer.email;
        } catch (err) {
          console.error(
            "❌ Failed to retrieve customer email from Stripe:",
            err.message,
          );
          email = "unknown@example.com";
        }
      }

      const stripeSessionId = session.id;
      const stripeSubscriptionId =
        session.subscription || session.payment_intent;
      const amount = session.amount_total;

      if (!userId) {
        console.warn("⚠️ Missing supabase_user_id in session metadata");
      } else {
        // Upgrade user
        const { error: updateError } = await supabase
          .from("users")
          .update({ role: "pro" })
          .eq("id", userId);

        if (updateError) {
          console.error("❌ Failed to upgrade user:", updateError.message);
        } else {
          console.log(`✅ User ${userId} upgraded to Pro`);
        }

        // Save subscription
        const { data: existing, error: fetchError } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("stripe_subscription_id", stripeSubscriptionId)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          console.error("❌ Supabase fetch error:", fetchError.message);
          return res.status(500).send("Fetch error");
        }

        if (!existing) {
          const { error: insertError } = await supabase
            .from("subscriptions")
            .insert([
              {
                user_id: userId,
                email,
                amount,
                stripe_customer_id: session.customer,
                stripe_subscription_id: session.subscription,
                stripe_session_id: session.id,
                price_id: session.items?.data?.[0]?.price?.id || null,
                payment_status: session.payment_status,
                status: "active",
                created_at: new Date().toISOString(),
              },
            ]);

          if (insertError) {
            console.error(
              "❌ Failed to insert into subscriptions:",
              insertError.message,
            );
          } else {
            console.log(`📦 Subscription record saved for ${userId}`);
          }
          console.log("📧 Attempting to send email to:", email);

          // Send confirmation email
          try {
            await sendMail(
              email,
              "✅ Welcome to SpaceGen AI Pro",
              `
              <div style="font-family: sans-serif; line-height: 1.6;">
                <h2 style="color: #0ea5e9;">👋 Welcome to <strong>SpaceGen AI Pro</strong>!</h2>
                <p>Hi ${email},</p>
                <p>Thank you for subscribing! Your payment of <strong>$${(amount / 100).toFixed(2)}</strong> was received successfully.</p>
                <p>You now have access to premium AI agents like:</p>
                <ul>
                  <li>📈 Stock Trading Agent</li>
                  <li>📣 Marketing Agent</li>
                  <li>🔓 And more exclusive features coming soon!</li>
                </ul>
                <p>Visit your <a href="https://spacegen-ai.com/dashboard">dashboard</a> to get started.</p>
                <hr />
                <p style="font-size: 0.8em; color: #888;">
                  Subscription ID: ${stripeSubscriptionId}<br/>
                  Session ID: ${stripeSessionId}
                </p>
              </div>
            `,
            );
            console.log("📧 Confirmation email sent to", email);
          } catch (mailError) {
            console.error("❌ Failed to send email:", mailError.message);
          }
        } else {
          console.log("ℹ️ Subscription already exists, skipping insert.");
        }
      }
    }

    // 🔹 Handle cancellation or payment failure
    if (
      event.type === "customer.subscription.deleted" ||
      event.type === "invoice.payment_failed"
    ) {
      const sub = event.data.object;
      const userId = sub.metadata?.supabase_user_id;

      if (!userId) {
        console.warn("⚠️ No supabase_user_id found in subscription metadata");
      } else {
        const { error: downgradeError } = await supabase
          .from("users")
          .update({ role: "free" })
          .eq("id", userId);

        if (downgradeError) {
          console.error("❌ Failed to downgrade user:", downgradeError.message);
        } else {
          console.log(`⬇️ User ${userId} downgraded to Free`);
        }
      }
    }

    // ✅ Done
    res.status(200).json({ received: true });
  },
);

module.exports = router;
