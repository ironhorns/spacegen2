// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  session,
  role,
  requiredRole,
  children,
}: {
  session: any;
  role?: string;
  requiredRole?: string;
  children: React.ReactNode;
}) {
  if (!session) return <Navigate to="/login" />;

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
