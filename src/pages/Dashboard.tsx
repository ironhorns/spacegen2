import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/SideBar";
import useUserRole from "@/hooks/useUserRole";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const status = new URLSearchParams(location.search).get("status");
  const success = status === "success";
  const downgraded = status === "downgraded";

  const { role } = useUserRole();

  useEffect(() => {
    // Admins get redirected to the admin dashboard on landing
    if (location.pathname === "/dashboard" && role === "admin") {
      navigate("/dashboard/admin");
    }

    // Clear query params after a short delay
    if (success || downgraded) {
      const timer = setTimeout(() => {
        window.history.replaceState(null, "", "/dashboard");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, role, success, downgraded, navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 space-y-6 p-10">
        {success && (
          <div className="shadow-subtle mb-6 rounded-xl border border-green-300 bg-green-50 p-5 text-green-800 backdrop-blur-sm">
            <h3 className="text-lg font-semibold">✅ Welcome to Pro!</h3>
            <p className="mt-1 text-sm">
              Your payment was successful. You now have full access to SpaceGen
              AI Pro features.
            </p>
          </div>
        )}

        {downgraded && (
          <div className="shadow-subtle mb-6 rounded-xl border border-yellow-300 bg-yellow-50 p-5 text-yellow-800 backdrop-blur-sm">
            <h3 className="text-lg font-semibold">⚠️ Pro Subscription Ended</h3>
            <p className="mt-1 text-sm">
              Your account has been downgraded to the Free plan. You can upgrade
              again anytime.
            </p>
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
}
