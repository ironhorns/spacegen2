import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="flex justify-between items-center bg-white px-6 py-4 shadow-md sticky top-0 z-50">
        
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2 text-gray-800 hover:text-purple-600">
          <Rocket className="w-6 h-6 text-purple-600" />
          <span className="text-xl font-bold">SpaceGen AI</span>
        </Link>
        
        {/* Nav Links */}
        <div className="flex items-center space-x-4">
        <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">Homes</Link>
          <Link to="/services" className="text-gray-700 hover:text-purple-600 font-medium">Services</Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium">Contact</Link>
        
          <Link to="/clients" className="text-gray-700 hover:text-purple-600 font-medium">
  Our Clients
</Link>

<Link to="/schedule"
  href="https://calendly.com/YOUR_USERNAME"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
>
  Schedule a Call
</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
