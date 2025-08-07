import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import useUserRole from "../hooks/useUserRole";

export default function AdminDashboard() {
  const { role, loading } = useUserRole();
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, role, created_at")
        .order("created_at", { ascending: false });
      if (error) console.error("❌ Failed to fetch users:", error.message);
      else setUsers(data);

      setLoadingUsers(false);
    };

    if (role === "admin") fetchUsers();
  }, [role]);

  const toggleDisableUser = async (
    userId: string,
    currentDisabled: boolean,
  ) => {
    const { error } = await supabase
      .from("users")
      .update({ disabled: !currentDisabled })
      .eq("id", userId);
    if (!error) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, disabled: !currentDisabled } : u,
        ),
      );
    }
  };

  if (loading || loadingUsers)
    return <div className="p-6 text-gray-500">Loading users...</div>;

  return (
    <main className="flex-1 space-y-6 p-10">
      {/* User table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-subtle">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Joined</th>
              <th className="px-4 py-3 text-center">Disabled</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800">{user.email}</td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {user.role}
                </td>
                <td className="px-4 py-3 text-center text-gray-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center text-gray-600">
                  {user.disabled ? "Yes" : "No"}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleDisableUser(user.id, user.disabled)}
                    className={`rounded px-3 py-1 text-xs text-white ${user.disabled ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                  >
                    {user.disabled ? "Enable" : "Disable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
