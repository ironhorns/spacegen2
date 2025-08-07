// src/components/NavigateAfterLogin.tsx
import { Navigate } from "react-router-dom";

export default function NavigateAfterLogin({ role }: { role: string }) {
  if (role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  } else {
    return <Navigate to="/dashboard/home" replace />;
  }
}
