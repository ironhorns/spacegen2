import useUserRole from "../../hooks/useUserRole";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function StockTradingAgent() {
  const { role, loading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && role !== "pro") {
      navigate("/dashboard"); // Redirect free users
    }
  }, [loading, role, navigate]);

  if (loading) return <div>Checking access...</div>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">📈 Stock Trading Agent (Pro)</h1>
      <p>This is a premium-only feature for Pro users.</p>
    </div>
  );
}
