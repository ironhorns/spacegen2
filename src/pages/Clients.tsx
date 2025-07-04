import React from "react";

const Clients = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Some of Our Valued Clients
      </h1>
      <p className="text-gray-600 mb-8">
        We are proud to have partnered with forward-thinking organizations from academia, government, and industry.
      </p>
      <img
        src="/images/clients.jpg"
        alt="Client logos"
        className="mx-auto rounded-lg shadow-md max-w-full"
      />
    </div>
  );
};

export default Clients;
