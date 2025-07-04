import React from "react";

const About = () => {
  const coreValues = [
    {
      title: "Reliable",
      desc: "We deliver tested, production-grade systems with robust architecture and fail-safe engineering practices.",
      img: "/images/reliable.jpg",
    },
    {
      title: "Extensible",
      desc: "Our solutions are built to grow — easily integrable, modular, and ready for the future.",
      img: "/images/extensible.jpg",
    },
    {
      title: "Innovative",
      desc: "We integrate AI, automation, and data intelligence to create smart, forward-thinking products.",
      img: "/images/innovative.jpg",
    },
  ];

  const servicesSummary = [
    { title: "AI & LLM Solutions", img: "/images/ai.jpg" },
    { title: "Full-Stack Web & Mobile", img: "/images/fullstack.jpg" },
    { title: "Cloud & DevOps", img: "/images/cloud.jpg" },
    { title: "Databases & Big Data", img: "/images/database.jpg" },
    { title: "SEO & Performance", img: "/images/seo.jpg" },
    { title: "UI/UX Design", img: "/images/design.jpg" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">
        About SpaceGen AI
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        At SpaceGen AI, we build future-ready digital solutions that are reliable,
        extensible, and tailored for scale. Whether you're launching a startup or
        modernizing enterprise platforms, we bring deep expertise in both AI-powered
        systems and traditional full-stack engineering to help you succeed.
      </p>

      {/* Core Values */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {coreValues.map((item, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-purple-700 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Services Summary */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Our Expertise
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          SpaceGen AI is a one-stop solution for cutting-edge and traditional software
          services. We provide:
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesSummary.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call To Action */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold text-purple-700 mb-3">
          Ready to Build With Us?
        </h3>
        <p className="text-gray-600 mb-6">
          Whether it's AI transformation or modern web apps — let's make it happen.
        </p>
        <a
          href="/contact"
          className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition"
        >
          Get in Touch
        </a>
      </div>
    </div>
  );
};

export default About;
