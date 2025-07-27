import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl transition hover:shadow-2xl">
      <div className="mb-4 flex items-center gap-3 text-accent">{icon}</div>
      <h3 className="text-xl font-semibold text-black">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
