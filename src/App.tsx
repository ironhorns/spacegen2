import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Navbar from "./pages/Navbar";
import Clients from "./pages/Clients";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <div className="min-h-screen bg-background text-black">
      <Navbar />
      <main className="max-full p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/home" element={<Services />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
