import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/spacegenailogo.png";
import { Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_OUT" || !session?.user) {
          setRole(null);
          setUser(null);
          return;
        }

        setUser(session.user);

        const { data, error: roleError } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();

        if (!roleError && data?.role) {
          setRole(data.role);
        } else {
          setRole("free");
        }
      },
    );

    // Initial fetch on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single()
          .then(({ data, error }) => {
            if (!error && data?.role) {
              setRole(data.role);
            } else {
              setRole("free");
            }
          });
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow-md">
      <nav className="relative sticky top-0 z-50 flex flex-wrap items-center justify-between px-6 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0">
          <div className="m-0 w-full p-0">
            <img
              src={logo}
              alt="SpaceGen AI Logo"
              className="block h-20 w-auto object-contain"
            />
          </div>
        </Link>

        {/* User Role and Avatar */}
        <div className="hidden items-center gap-4 lg:flex" ref={dropdownRef}>
          {role && (
            <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
              Role: {role}
            </span>
          )}
          <div className="relative">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email || "User"}`}
              alt="Profile"
              className="h-10 w-10 cursor-pointer rounded-full border hover:ring-2 hover:ring-gray-300"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="absolute right-0 z-10 mt-[6px] w-40 rounded-lg border bg-white shadow-md">
                <ul className="text-sm text-gray-700">
                  <li className="block cursor-pointer px-4 py-2 hover:bg-gray-100">
                    Settings
                  </li>
                  <li
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                  >
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="text-black lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
