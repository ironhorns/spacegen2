

const services = [
  {
    title: "AI & LLM-Powered Solutions",
    description:
      "We build intelligent agents using state-of-the-art LLMs like GPT-4, Claude, and custom fine-tuned models. Automate workflows, customer support, and decision-making using GenAI.",
    image: "https://picsum.photos/seed/ai-llm/800/600",
  },
  {
    title: "Full-Stack Web & Mobile Development",
    description:
      "From React, Next.js, and Tailwind CSS to Node.js, .NET, and Python—our teams deliver scalable front-end and back-end systems for modern web and mobile applications.",
    image: "https://picsum.photos/seed/fullstack/800/600",
  },
  {
    title: "Cloud Infrastructure & DevOps",
    description:
      "We design and manage cloud-native architectures on AWS, Azure, and GCP. CI/CD pipelines, containerization (Docker, Kubernetes), monitoring, and infrastructure as code (Terraform).",
    image: "https://picsum.photos/seed/cloud-devops/800/600",
  },
  {
    title: "Database & Data Engineering",
    description:
      "Expertise in SQL (PostgreSQL, MySQL), NoSQL (MongoDB, Redis), Vector DBs (Pinecone, Weaviate), and large-scale data lake solutions. We also do ETL/ELT and analytics integration.",
    image: "https://picsum.photos/seed/databases/800/600",
  },
  {
    title: "SEO & Performance Optimization",
    description:
      "Modern SEO strategies with Core Web Vitals, semantic HTML, structured data, sitemaps, and performance tuning. We help boost visibility, rankings, and conversion rates.",
    image: "https://picsum.photos/seed/seo/800/600",
  },
  {
    title: "UI/UX & Product Design",
    description:
      "Beautiful, intuitive design using Figma, Framer, and interactive prototyping. We ensure accessibility, usability, and pixel-perfect interfaces across all platforms.",
    image: "https://picsum.photos/seed/uiux/800/600",
  },
];

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-12">
        Our Services
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
