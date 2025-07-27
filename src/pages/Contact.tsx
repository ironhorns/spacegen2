import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !reason || !email || !message || !isValidEmail(email)) {
      setError("Please fill in all fields correctly.");
      return;
    }

    const templateParams = {
      name,
      reason,
      email,
      message,
    };

    emailjs
      .send(
        "service_02ctonj",
        "template_xvxhx66",
        templateParams,
        "eyb9nWJPGqTkDyq7v",
      )
      .then(() => {
        setSent(true);
        setName("");
        setReason("");
        setEmail("");
        setMessage("");
        setError("");
      })
      .catch((err) => {
        setError("Something went wrong. Please try again later.");
        console.error(err);
      });
  };

  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-purple-700">Contact Us</h1>

      <form onSubmit={handleSubmit} className="mb-12 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full rounded-md border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className="w-full rounded-md border px-3 py-2"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        >
          <option value="">Select a reason</option>
          <option value="Sales">Sales Inquiry</option>
          <option value="Support">Support Request</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="email"
          placeholder="Your Email"
          className="w-full rounded-md border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          className="h-32 w-full rounded-md border px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        {error && <p className="text-red-500">{error}</p>}
        {sent && <p className="text-green-600">Your message has been sent!</p>}

        <button
          type="submit"
          className="w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Send Message
        </button>
      </form>

      {/* ===== Other Ways to Reach Us ===== */}
      <div className="mt-8 border-t pt-8"></div>
    </div>
  );
};

export default Contact;
