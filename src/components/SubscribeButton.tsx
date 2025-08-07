// components/SubscribeButton.tsx

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function SubscribeButton() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user); // ✅ Store full user object
      }
    };

    getUser();
  }, []);

  const handleSubscribe = async () => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          user_id: user?.id, // ✅ Include user_id
        }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        alert("Subscription error.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={!user}
      className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:opacity-50"
    >
      Go Pro 🚀
    </button>
  );
}
