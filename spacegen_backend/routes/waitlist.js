// routes/waitlist.js
const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const sendMail = require("../utils/mailer");

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const { error } = await supabase.from("waitlist").insert([{ email }]);

    if (error) {
      console.error("❌ Supabase insert error:", error.message);
      return res.status(500).json({ error: "Database insert failed" });
    }

    await sendMail(
      email,
      "🚀 Welcome to SpaceGen AI Waitlist",
      `Hi there,\n\nYou're now on the waitlist for SpaceGen AI. We're excited to have you onboard.\n\nMore updates coming soon!\n\n– The SpaceGen AI Team`,
    );

    return res.status(200).json({ message: "Successfully added to waitlist!" });
  } catch (err) {
    console.error("❌ Error handling waitlist:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
