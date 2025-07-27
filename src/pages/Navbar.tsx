import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/spacegen-logo2.png";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    // { label: "Home", path: "/" },
    // { label: "Services", path: "/services" },
    // { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
    // { label: "Our Clients", path: "/clients" },
  ];

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

        {/* Mobile menu button */}
        <button
          className="text-black lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } mt-4 w-full lg:mt-0 lg:flex lg:w-auto lg:items-center lg:space-x-6`}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-2 py-1 text-center font-medium transition-colors lg:inline-block ${
                isActive(item.path)
                  ? "text-black"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* <a
            href="https://calendly.com/trazak"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-md bg-black px-4 py-2 text-center text-white transition hover:bg-gray-800 lg:mt-0 lg:inline-block"
          >
            Schedule a Call
          </a> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
