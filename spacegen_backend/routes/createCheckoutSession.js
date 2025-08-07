const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const { customer_id, user_id } = req.body; // ✅ FIXED: Extract user_id here

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customer_id,
      metadata: {
        supabase_user_id: user_id, // ✅ Now it's properly passed
      },
      line_items: [
        {
          price: process.env.STRIPE_PRO_MONTHLY_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

module.exports = router;
