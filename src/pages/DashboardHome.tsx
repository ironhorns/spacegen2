import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import useUserRole from "../hooks/useUserRole";
import GoProButton from "@/components/GoProButton";
import BillingPortalButton from "@/components/BillingPortalButton";
import SubscribeButton from "@/components/SubscribeButton";

export default function DashboardHome() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const { role, loading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        console.warn("🚫 No active session — redirecting to login.");
        navigate("/login", { replace: true });
      } else {
        setUser(session.user);
        console.log("✅ Session fetched:", session);
        console.log("📬 Email confirmed at:", session.user.email_confirmed_at);
      }

      setLoadingUser(false);
    };

    getSession();
  }, [navigate]);

  if (loadingUser || loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  if (!user) {
    return (
      <div className="p-6 text-red-500">
        ❌ No user session. Try logging in again.
      </div>
    );
  }
  if (!user.email_confirmed_at) {
    return (
      <div className="p-6 text-yellow-600">
        🚫 Please verify your email address before accessing the dashboard.
        <br />
        Check your inbox or spam folder for a confirmation email.
      </div>
    );
  }

  console.log("Rendering DashboardHome for role:", role); // ✅ Safe here

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Welcome, {user.email} 👋
      </h1>

      {/* Show Subscribe + Go Pro only for Free users */}
      {role === "free" && (
        <>
          <div className="mt-6">
            <SubscribeButton />
          </div>
          <div className="mt-6">
            <GoProButton />
          </div>
        </>
      )}

      {role === "pro" && (
        <div className="mt-6">
          <BillingPortalButton />
          <p className="mt-2 text-sm text-gray-500">
            You can cancel or update your subscription anytime.
          </p>
        </div>
      )}

      <p className="mt-6 text-gray-600">
        This is your personalized dashboard to access AI agents, manage your
        subscription, and more.
      </p>
    </div>
  );
}
