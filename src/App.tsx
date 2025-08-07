import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Clients from "./pages/Clients";
import Schedule from "./pages/Schedule";
import AuthForm from "./components/AuthForm";

import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import WritingAssistant from "./pages/agents/WritingAssistant";
import StockTradingAgent from "./pages/agents/StockTradingAgent";
import MarketingAgent from "./pages/agents/MarketingAgent";
import AdminDashboard from "./pages/AdminDashboard";
import Account from "./pages/Account";
import NavigateAfterLogin from "./components/NavigateAfterLogin";

function App() {
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState("free");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error getting session:", error.message);

      const currentSession = data?.session;
      setSession(currentSession);

      if (currentSession?.user) {
        await syncUserToDatabase(currentSession.user);
      }

      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          await syncUserToDatabase(newSession.user);
        }
      },
    );

    fetchSession();

    return () => listener.subscription.unsubscribe();
  }, []);

  const syncUserToDatabase = async (user: any) => {
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Failed to fetch user role:", fetchError.message);
    }

    const userRole = existingUser?.role || "free";
    setRole(userRole);

    await supabase.from("users").upsert({
      id: user.id,
      email: user.email,
      role: userRole,
    });
  };

  if (loading) return <div className="mt-10 text-center">Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="max-full ">
        {/* 🔴 Temporary Logout Button for Debugging */}
        {/* <div className="mb-4 text-right">
          <button
            onClick={async () => await supabase.auth.signOut()}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Force Logout
          </button>
        </div> */}

        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              loading ? (
                <div>Loading...</div>
              ) : !session ? (
                <AuthForm />
              ) : (
                <NavigateAfterLogin role={role} />
              )
            }
          />

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/schedule" element={<Schedule />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute session={session}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<DashboardHome />} />
            <Route path="writing-assistant" element={<WritingAssistant />} />
            <Route path="stock-trading" element={<StockTradingAgent />} />
            <Route
              path="marketing-agent"
              element={
                <ProtectedRoute
                  session={session}
                  role={role}
                  requiredRole="pro"
                >
                  <MarketingAgent />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin"
              element={
                <ProtectedRoute
                  session={session}
                  role={role}
                  requiredRole="admin"
                >
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="account" element={<Account />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<div>404 – Page Not Found</div>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
