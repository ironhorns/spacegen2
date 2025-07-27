export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-blue-900">
      {/* Hero Section */}
      <section
        className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 pb-10 pt-16 text-center
      "
      >
        {/* 🧠 Heading */}
        <h1 className="mb-4 text-5xl font-extrabold">
          AI Agents That Work For You — While You Sleep.
        </h1>
        <p className="mb-2 mt-0 text-sm text-green-800">
          Automate your lead generation, outreach, and content with intelligent
          agents. SpaceGen AI is launching soon — join the waitlist or lock in
          early access.
        </p>

        {/* 💌 Email Waitlist Form */}
        {/* 💌 Email Waitlist Form (Connected to Backend) */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const emailInput =
              document.querySelector<HTMLInputElement>("#waitlistEmail");
            const messageLabel =
              document.querySelector<HTMLParagraphElement>("#formMessage");

            if (!emailInput) return;

            const email = emailInput.value.trim();
            if (!email) {
              messageLabel!.textContent = "❌ Please enter an email.";
              return;
            }

            messageLabel!.textContent = "Submitting...";

            try {
              const res = await fetch("http://localhost:5000/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
              });
              const data = await res.json();

              if (res.ok) {
                messageLabel!.textContent =
                  "✅ You've been added to the waitlist!";
                emailInput.value = "";
              } else {
                messageLabel!.textContent = `❌ ${data.error}`;
              }
            } catch (err) {
              messageLabel!.textContent = "❌ Network error. Please try again.";
            }
          }}
          className="mx-auto mb-4 flex w-full max-w-xl flex-col items-center gap-4 sm:flex-row"
        >
          <input
            id="waitlistEmail"
            type="email"
            required
            placeholder="Enter your email"
            className="w-full rounded-lg border border-blue-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="py3 mb-2 inline-block rounded-lg bg-blue-600 px-10 font-semibold text-white transition hover:bg-green-700"
          >
            Join the Waitlist
          </button>
          <p
            id="formMessage"
            className="text-center text-sm text-blue-600 sm:ml-4 sm:mt-0"
          ></p>
        </form>

        <p className="mb-6 text-sm text-blue-500">
          Be the first to know. Early birds get exclusive discounts and updates.
        </p>

        {/* 🔹 Divider with OR */}
        <div className="mb-6 flex w-full max-w-sm items-center gap-4">
          <div className="h-px flex-grow bg-blue-300" />
          <span className="text-sm font-medium text-blue-500">or</span>
          <div className="h-px flex-grow bg-blue-300" />
        </div>

        {/* 💳 Stripe Early Bird CTA */}
        <div className="text-center">
          <p className="mb-4 text-lg font-semibold text-blue-800">
            🔥 Want instant access? Join now for just{" "}
            <span className="font-bold">$49/month</span> — 50% off!
          </p>
          <a
            href="https://buy.stripe.com/7sYcN4cqp6Yxduh6dn8AE00"
            className="mb-2 inline-block rounded-lg bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
          >
            Subscribe Now – $49/month Early Access
          </a>
          <p className="mt-1 text-sm text-green-800">
            Cancel anytime. Lifetime early bird rate. Limited time only.
          </p>
        </div>
      </section>

      {/* Optional: Coming Soon Features */}
      <section className="bg-white px-6 pb-20 pt-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 text-center md:grid-cols-3">
          <div className="rounded-xl bg-blue-100 p-6 shadow">
            <h3 className="mb-2 text-2xl font-bold">Lead Gen Agent</h3>
            <p className="text-sm text-blue-700">
              Autonomously find prospects, extract contacts, and send cold
              emails.
            </p>
          </div>
          <div className="rounded-xl bg-blue-100 p-6 shadow">
            <h3 className="mb-2 text-2xl font-bold">Content Agent</h3>
            <p className="text-sm text-blue-700">
              Automatically generate blogs, LinkedIn posts, and marketing
              content using GPT-4.
            </p>
          </div>
          <div className="rounded-xl bg-blue-100 p-6 shadow">
            <h3 className="mb-2 text-2xl font-bold">Outreach Agent</h3>
            <p className="text-sm text-blue-700">
              Follow up with leads, respond intelligently, and book meetings on
              autopilot.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-blue-500">
        © {new Date().getFullYear()} SpaceGen AI. All rights reserved.
      </footer>
    </main>
  );
}
