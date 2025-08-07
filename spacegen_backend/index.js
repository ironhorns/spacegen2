const express = require("express");
const router = express.Router();
const app = express();
require("dotenv").config();
const cors = require("cors");

const webhookRoute = require("./routes/webhook");
const waitlistRoutes = require("./routes/waitlist");
const stripeWebhook = require("./webhooks/stripe");
const stripeBillingPortal = require("./routes/stripeBillingPortal");
const stripePortalRoute = require("./routes/stripePortal");
const createCheckoutRoute = require("./routes/createCheckoutSession");
const stripeRoutes = require("./routes/stripeCheckout");
//const emailWelcomeRoute = require("./routes/emailWelcome");

// ✅ Webhooks: must be mounted BEFORE json/cors
app.use("/webhooks", stripeWebhook);
app.use("/api/stripe/webhook", require("./webhooks/stripe"));
app.use(cors());
app.use(express.json());

// Stripe Checkout
app.use("/api/stripe/checkout", require("./routes/stripeCheckout"));

// app.use("/api/email/welcome", emailWelcomeRoute);
// Stripe Billing
app.use("/api/stripe/portal", require("./routes/stripePortal")); // pick ONE

// Others
app.use("/api/waitlist", waitlistRoutes);
app.use("/api/webhook", webhookRoute);
app.use("/api/stripe/create-checkout-session", createCheckoutRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// require("./routes/createCheckoutSession");
// const stripeRoutes = require("./routes/stripe");

// app.use("/api/waitlist", waitlistRoutes);
// app.use("/api/webhook", webhookRoute);
// app.use(cors());
// app.use("/api/stripe/webhook", stripeWebhook);
// app.use("/api/stripe/portal", stripeBillingPortal);

// // Stripe webhook listener (Stripe backend calls this)
// //app.use("/api/webhook", require("./webhooks/stripe"));

// app.use("/api/stripe/portal", stripePortalRoute);
// app.use("/api/stripe/checkout", require("./routes/stripeCheckout"));
// app.use("/api/stripe/create-checkout-session", createCheckoutRoute);

// // Stripe checkout & billing routes (frontend calls this)
// app.use("/api/stripe", require("./routes/stripe"));
// app.use(express.json());
// app.use("/api/stripe", stripeRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
