// components/GoProButton.tsx

/**
 * GoProButton.tsx
 *
 * PURPOSE:
 * Renders a button that allows the user to upgrade their account to "Pro" by subscribing
 * to a Stripe plan. It fetches the checkout session URL from the backend and redirects.
 *
 * HOW IT WORKS:
 * - When clicked, it sends a POST request to `/api/stripe/create-checkout-session`
 *   with the current user's email and Supabase ID.
 * - On success, it redirects the user to the Stripe-hosted checkout page.
 *
 * USED IN:
 * - DashboardHome.tsx
 * - Anywhere else the "Go Pro" upgrade option is needed
 */

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function GoProButton() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };
    fetchUser();
  }, []);

  const handleUpgrade = async () => {
    if (!user) return alert("Please log in first.");

    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          user_id: user.id,
        }),
      });

      const { url } = await res.json();
      window.location.href = url;
    } catch (err) {
      console.error("Upgrade failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-2 text-white hover:opacity-90"
    >
      Upgrade to Pro 🚀
    </button>
  );
}
