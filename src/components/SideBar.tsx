import {
  LogOut,
  Home,
  User as UserIcon,
  Bot,
  ShieldCheck,
  BarChart3,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import useUserRole from "@/hooks/useUserRole";

export default function Sidebar() {
  const navigate = useNavigate();
  const { role } = useUserRole();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const commonLinks = [
    {
      to: "/dashboard/account",
      icon: <UserIcon size={20} />,
      label: "Account",
    },
  ];

  const proLinks = [
    {
      to: "/dashboard/writing-assistant",
      icon: <Bot size={20} />,
      label: "Writing Assistant",
    },
    {
      to: "/dashboard/stock-trading",
      icon: <Bot size={20} />,
      label: "Stock Trading Agent",
    },
    {
      to: "/dashboard/marketing-agent",
      icon: <Bot size={20} />,
      label: "Marketing Agent",
    },
  ];

  const adminLinks = [
    {
      to: "/dashboard/admin",
      icon: <ShieldCheck size={20} />,
      label: "Admin Tools",
    },
    {
      to: "/dashboard/reports",
      icon: <BarChart3 size={20} />,
      label: "Reports",
    },
    {
      to: "/dashboard/manage-users",
      icon: <Users size={20} />,
      label: "Manage Users",
    },
    {
      to: "/dashboard/manage-roles",
      icon: <ShieldCheck size={20} />,
      label: "Manage Roles",
    },
  ];

  const linksToRender =
    role === "admin"
      ? [...adminLinks, ...commonLinks]
      : role === "pro"
        ? [...proLinks, ...commonLinks]
        : [...commonLinks];

  return (
    <aside className="w-64 bg-white p-6 shadow-xl">
      <h2 className="mb-8 text-2xl font-bold text-blue-600">SpaceGen AI</h2>
      <nav className="space-y-4">
        {linksToRender.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            {link.icon} {link.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 text-gray-700 hover:text-red-500"
        >
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </aside>
  );
}
