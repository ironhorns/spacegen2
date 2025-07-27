import { Icon } from "@iconify/react";
import { useState } from "react";

const iconMap: Record<string, string> = {
  React: "logos:react",
  "Next.js": "logos:nextjs-icon",
  "Node.js": "logos:nodejs-icon",
  Python: "logos:python",
  TensorFlow: "logos:tensorflow",
  LangChain: "simple-icons:langchain",
  MongoDB: "logos:mongodb-icon",
  PostgreSQL: "logos:postgresql",
  AWS: "logos:aws",
  Azure: "logos:microsoft-azure",
  Docker: "logos:docker-icon",
  Kubernetes: "logos:kubernetes",
};

export default function TechnologyCard({ name }: { name: string }) {
  const [iconError, setIconError] = useState(false);
  const iconId = iconMap[name] || "mdi:alert-circle-outline";
  return (
    <div className="flex flex-col items-center rounded-lg border border-gray-200 p-6 transition-all hover:shadow-md">
      <div className="mb-4 h-12 w-12">
        {iconError ? (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Icon icon="mdi:alert-circle-outline" width={24} height={24} />
          </div>
        ) : (
          <Icon
            icon={iconId}
            width={48}
            height={48}
            onError={() => setIconError(true)}
          />
        )}
      </div>
      <span className="font-medium text-gray-800">{name}</span>
    </div>
  );
}
