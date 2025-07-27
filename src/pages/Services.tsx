import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  CreditCard,
  Cpu,
  Code,
  Lock,
  Database,
  Mail,
} from "lucide-react";
import { useState } from "react";

const services = [
  {
    title: "AI & LLM-Powered Solutions",
    description:
      "We build intelligent agents using state-of-the-art LLMs like GPT-4, Claude, and Mistral integrated with your systems.",
    hoverTitle: "Advanced AI Automation",
    hoverDescription:
      "Tailored AI models to automate workflows and decision-making.",
    image: "/images/ai.jpg",
    hoverImage: "/images/ai-hover.jpg",
    icon: Brain,
    size: "large",
  },
  {
    title: "Cloud Architecture",
    description:
      "Scalable, secure, and high-performing cloud solutions on AWS, Azure, and GCP.",
    hoverTitle: "Robust Cloud Systems",
    hoverDescription:
      "Infrastructure as code and seamless cloud deployment pipelines.",
    image: "/images/cloud.jpg",
    hoverImage: "/images/cloud-hover.jpg",
    icon: Cloud,
    size: "medium",
  },
  {
    title: "Secure Payment Gateways",
    description:
      "PCI-compliant custom payment solutions and tokenized transaction engines.",
    hoverTitle: "Safe & Fast Payments",
    hoverDescription: "Fraud prevention and high-scale transaction processing.",
    image: "/images/payment.jpg",
    hoverImage: "/images/payment-hover.jpg",
    icon: CreditCard,
    size: "medium",
  },
  {
    title: "AI SaaS Platforms",
    description:
      "From zero to production — full-stack SaaS platforms powered by LLMs.",
    hoverTitle: "SaaS Powered by AI",
    hoverDescription: "Launch scalable AI SaaS products with API-first design.",
    image: "/images/saas.jpg",
    hoverImage: "/images/saas-hover.jpg",
    icon: Cpu,
    size: "small",
  },
  {
    title: "Backend APIs & Microservices",
    description:
      "Fast, scalable REST and GraphQL APIs using Node.js, Python, and .NET Core.",
    hoverTitle: "APIs for Scale",
    hoverDescription: "Microservices architecture optimized for performance.",
    image: "/images/backend.jpg",
    hoverImage: "/images/backend-hover.jpg",
    icon: Code,
    size: "medium",
  },
  {
    title: "Security & Identity Management",
    description:
      "OAuth2, JWT, SSO, MFA — complete identity lifecycle management.",
    hoverTitle: "Enterprise Security",
    hoverDescription: "Secure access control and identity compliance.",
    image: "/images/security.jpg",
    hoverImage: "/images/security-hover.jpg",
    icon: Lock,
    size: "small",
  },
  {
    title: "Data Engineering & AI Analytics",
    description: "Big data pipelines, feature stores, and AI dashboards.",
    hoverTitle: "Intelligent Data Pipelines",
    hoverDescription: "Real-time analytics and machine learning deployment.",
    image: "/images/data.jpg",
    hoverImage: "/images/data-hover.jpg",
    icon: Database,
    size: "large",
  },
  {
    title: "Email & Notification Systems",
    description:
      "Transactional email, SMS, WhatsApp, and mobile push services.",
    hoverTitle: "Omnichannel Messaging",
    hoverDescription:
      "Reliable, scalable notification and communication platforms.",
    image: "/images/email.jpg",
    hoverImage: "/images/email-hover.jpg",
    icon: Mail,
    size: "small",
  },
];

const sizeMap = {
  small: "col-span-1 row-span-1",
  medium: "col-span-2 row-span-1",
  large: "col-span-2 row-span-2",
};

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-grey-900 min-h-screen bg-white"
    >
      {/* Banner */}
      <div
        className="flex h-[250px] w-full items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/images/techbackground.jpg)" }}
      >
        <h1 className="text-4xl font-bold text-white drop-shadow-md md:text-5xl">
          Our Services
        </h1>
      </div>

      {/* Grid */}
      <div className="auto-flow-dense grid auto-rows-[300px] grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-4 md:p-8">
        {services.map((service, index) => {
          const isHovered = hoveredIndex === index;
          const backgroundImage = isHovered
            ? service.hoverImage
            : service.image;
          const title =
            isHovered && service.hoverTitle
              ? service.hoverTitle
              : service.title;
          const description =
            isHovered && service.hoverDescription
              ? service.hoverDescription
              : service.description;
          const Icon = service.icon;

          return (
            <motion.div
              key={index}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(0)}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className={`relative overflow-hidden rounded-xl shadow-lg ${sizeMap[service.size as keyof typeof sizeMap]}`}
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/60 transition duration-300 group-hover:bg-black/40"></div>
              <div className="relative z-10 flex h-full flex-col justify-end p-4">
                <Icon className="mb-2 h-8 w-8 text-white" />
                <h2 className="mb-1 text-xl font-semibold text-white">
                  {title}
                </h2>
                <p className="text-sm text-gray-200">{description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
