// supabaseClient.js
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
console.log("🔑 Supabase KEY:", process.env.SUPABASE_KEY.slice(0, 10) + "..."); // o
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

module.exports = supabase;
