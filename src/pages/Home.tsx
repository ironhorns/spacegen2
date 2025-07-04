import { Rocket, Brain, Code, Cloud, Lock, Database, CreditCard, Cpu, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
   

      {/* Hero Section */}
     {/* Hero Section */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7 }}
  className="text-center mb-16 pt-10 px-6"
>
  <h1 className="text-5xl font-bold text-gray-800 flex justify-center items-center gap-3">
    <Rocket className="w-10 h-10 text-purple-600" /> SpaceGen AI
  </h1>


  {/* 🔁 Video Player instead of Button */}
  <div className="mt-3 w-2/4 mx-auto rounded-xl overflow-hidden shadow-lg">
    <video
      className="w-full h-auto"
      controls
      autoPlay
      muted
      loop
      poster="/images/video-poster.jpg" // Optional: Static thumbnail before play
    >
      <source src="/images/demo2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</motion.div>


      {/* Services Section */}
      <section id="services" className="max-w-6xl mx-auto mb-20 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Services</h2>
        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
    Solutions for AI and Agents Modern and Classic full stack development
  </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Brain className="text-purple-600 w-8 h-8" />}
            title="AI Agents & LLM Integration"
            description="Deploy autonomous agents powered by GPT-4, Claude, and Whisper using LangChain, Pinecone, and vector databases."
          />
          <FeatureCard
            icon={<Code className="text-purple-600 w-8 h-8" />}
            title="Full-Stack Development"
            description="Build enterprise-grade apps with React, Next.js, Angular, Node.js, Python, and .NET Core."
          />
          <FeatureCard
            icon={<Cloud className="text-purple-600 w-8 h-8" />}
            title="Cloud-Native SaaS"
            description="Build scalable serverless systems using AWS Lambda, API Gateway, Cognito, and Terraform."
          />
          <FeatureCard
            icon={<CreditCard className="text-purple-600 w-8 h-8" />}
            title="Fintech & Payments"
            description="Integrate token vaults, Stripe, EMV, and PCI-compliant fraud detection systems."
          />
          <FeatureCard
            icon={<Database className="text-purple-600 w-8 h-8" />}
            title="Databases & Storage"
            description="Use PostgreSQL, MongoDB, Redis, DynamoDB, and Pinecone for mixed data workloads."
          />
          <FeatureCard
            icon={<Lock className="text-purple-600 w-8 h-8" />}
            title="Security & Compliance"
            description="Implement Zero Trust, OAuth2, SSO, and meet HIPAA/PCI/GDPR compliance."
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16 rounded-2xl shadow-md max-w-6xl mx-auto mb-20 px-6">
        <div className="flex items-center gap-4 mb-6">
          <Cpu className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">About Us</h2>
        </div>
        <p className="text-gray-700 text-md leading-relaxed">
          SpaceGen AI is a forward-thinking software company specializing in AI-driven applications and intelligent agent architecture.
          We design scalable SaaS platforms integrating LLMs, vector databases, and cloud-native technologies.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-purple-50 py-16 rounded-2xl shadow-md max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
          <Mail className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
        </div>
        <p className="text-gray-700 mb-4">
          We'd love to hear from you. Whether you're ready to build your AI SaaS solution or just want to chat, reach out anytime.
        </p>
        <form className="grid grid-cols-1 gap-4">
          <input className="p-3 rounded-md border border-gray-300" type="text" placeholder="Your Name" />
          <input className="p-3 rounded-md border border-gray-300" type="email" placeholder="Your Email" />
          <textarea className="p-3 rounded-md border border-gray-300" rows={4} placeholder="Your Message"></textarea>
          <Button className="w-full">Send Message</Button>
        </form>
      </section>
    </div>
  );
}

export default App;
