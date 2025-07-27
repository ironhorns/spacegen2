const supabase = require("../supabaseClient");

const addToWaitlist = async (req, res) => {
  const { email } = req.body;

  console.log("Received email:", email);

  if (!email) {
    console.log("❌ No email provided");
    return res.status(400).json({ error: "Email is required" });
  }

  const { data, error } = await supabase
    .from("waitlist")
    .insert([{ email }])
    .select(); // 👈 this fetches inserted row(s)

  if (error) {
    console.error("❌ Supabase error:", error);
    return res.status(500).json({ error: error.message });
  }

  console.log("✅ Added to waitlist:", data);
  res.status(200).json({ message: "Email added to waitlist!", data });
};

module.exports = { addToWaitlist };
