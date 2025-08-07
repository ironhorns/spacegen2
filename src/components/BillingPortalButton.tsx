/**
 * BillingPortalButton.tsx
 *
 * PURPOSE:
 * - Renders a button that redirects the user to their Stripe Billing Portal
 *   where they can manage payment methods, view invoices, or cancel their subscription.
 *
 * HOW IT WORKS:
 * - Fetches the logged-in user's Stripe customer ID from Supabase
 * - Sends a POST request to your backend route (/api/stripe/portal)
 * - Redirects to Stripe-hosted billing portal
 */

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function BillingPortalButton() {
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
        console.error("Error fetching stripe_customer_id:", error.message);
      } else {
        setStripeCustomerId(data?.stripe_customer_id);
      }

      setLoading(false);
    };

    fetchCustomerId();
  }, []);

  const openBillingPortal = async () => {
    if (!stripeCustomerId) {
      alert("No Stripe customer ID found for this user.");
      return;
    }

    try {
      console.log("Sending customer_id:", stripeCustomerId);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/stripe/portal`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customer_id: stripeCustomerId }),
        },
      );

      const result = await res.json();
      if (result?.url) {
        window.location.href = result.url;
      } else {
        throw new Error("No URL returned from billing portal endpoint");
      }
    } catch (err) {
      console.error("Billing portal error:", err);
      alert("Could not open billing portal.");
    }
  };

  if (loading || !stripeCustomerId) return null;

  return (
    <button
      onClick={openBillingPortal}
      className="mt-4 rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
    >
      Cancel / Manage Subscription
    </button>
  );
}
