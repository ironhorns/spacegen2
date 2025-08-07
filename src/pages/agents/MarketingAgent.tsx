import useUserRole from "../../hooks/useUserRole";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function MarketingAgent() {
  const { role, loading } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && role !== "pro") {
      navigate("/dashboard"); // Redirect Free users
    }
  }, [loading, role, navigate]);

  if (loading) return <div>Checking access...</div>;

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">📣 Marketing Agent (Pro)</h1>
      <p>
        This is a premium-only feature to build AI-powered campaigns, content,
        and landing pages.
      </p>
    </div>
  );
}
