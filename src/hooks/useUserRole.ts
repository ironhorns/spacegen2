import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Role = "free" | "pro" | "admin" | null;

export default function useUserRole() {
  const [role, setRole] = useState<Role>(null);
  const [user, setUser] = useState<any>(null); // You can improve the type later
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndRole = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        setLoading(false);
        return;
      }

      const userId = session.user.id;
      setUser(session.user);

      const { data, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (!roleError && data?.role) {
        setRole(data.role);
      } else {
        console.warn("Failed to fetch role:", roleError?.message);
        setRole("free"); // fallback default
      }

      setLoading(false);
    };

    fetchUserAndRole();
  }, []);

  return { role, user, loading };
}
