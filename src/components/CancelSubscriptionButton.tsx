/**
 * CancelSubscriptionButton.tsx
 *
 * Purpose:
 * - Opens Stripe Billing Portal so user can cancel their subscription or manage billing.
 * - Triggered via POST to /api/stripe/portal using stripe_customer_id from Supabase.
 */

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function CancelSubscriptionButton() {
  const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerId = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const userId = session?.user?.id;
      if (!userId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("stripe_customer_id")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("❌ Error fetching stripe_customer_id:", error.message);
      } else {
        setStripeCustomerId(data?.stripe_customer_id);
      }

      setLoading(false);
    };

    fetchCustomerId();
  }, []);

  const openStripePortal = async () => {
    if (!stripeCustomerId) {
      alert("Stripe billing details not found for your account.");
      return;
    }

    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: stripeCustomerId }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Stripe portal URL not returned.");
      }
    } catch (err) {
      console.error("❌ Stripe portal error:", err);
      alert("Unable to open billing portal. Try again later.");
    }
  };

  if (loading || !stripeCustomerId) return null;

  return (
    <button
      onClick={openStripePortal}
      className="mt-4 rounded-xl bg-red-600 px-6 py-2 text-white transition-all hover:bg-red-700"
    >
      Cancel / Manage Subscription
    </button>
  );
}
