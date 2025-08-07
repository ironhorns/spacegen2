// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendMail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"SpaceGen AI" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent:", info.messageId);
  } catch (err) {
    console.error("❌ Email failed:", err.message);
  }
}

function generateWelcomeEmail(email) {
  return {
    subject: "👋 Welcome to SpaceGen AI!",
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2 style="color: #0ea5e9;">Welcome to <strong>SpaceGen AI</strong> 👋</h2>
        <p>Hi ${email},</p>
        <p>Thank you for joining our platform! Explore AI agents and get started.</p>
        <p>Visit your <a href="https://spacegen-ai.com/dashboard">dashboard</a> to begin.</p>
        <p>Need help? Just reply to this email.</p>
        <p>— The SpaceGen AI Team</p>
      </div>
    `,
  };
}

function generateProSubscriptionEmail(
  email,
  amount,
  stripeSubscriptionId,
  stripeSessionId,
) {
  return {
    subject: "✅ Welcome to SpaceGen AI Pro",
    html: `
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
  };
}

function generateDowngradeEmail(email) {
  return {
    subject: "🔔 Your SpaceGen AI Pro subscription has ended",
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2 style="color: #e11d48;">We're sad to see you go</h2>
        <p>Hi ${email},</p>
        <p>Your SpaceGen AI Pro subscription has ended and your account has been downgraded to the Free tier.</p>
        <p>You can re-subscribe anytime to regain access to premium agents.</p>
        <p>Visit your <a href="https://spacegen-ai.com/dashboard">dashboard</a> to manage your plan.</p>
        <p>– The SpaceGen AI Team</p>
      </div>
    `,
  };
}

module.exports = {
  sendMail,
  generateWelcomeEmail,
  generateProSubscriptionEmail,
  generateDowngradeEmail,
};
