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
        "service_02ctonj",       // 🔁 Replace with your actual Service ID
        "template_xvxhx66",      // 🔁 Replace with your actual Template ID
        templateParams,
        "eyb9nWJPGqTkDyq7v"        // 🔁 Replace with your Public Key
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
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border px-3 py-2 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className="w-full border px-3 py-2 rounded-md"
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
          className="w-full border px-3 py-2 rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          className="w-full border px-3 py-2 rounded-md h-32"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        {error && <p className="text-red-500">{error}</p>}
        {sent && <p className="text-green-600">Your message has been sent!</p>}

        <button
          type="submit"
          className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
