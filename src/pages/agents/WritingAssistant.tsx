// src/pages/agents/WritingAssistant.tsx

import useUserRole from "@/hooks/useUserRole";

export default function WritingAssistant() {
  const { role } = useUserRole();

  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Writing Assistant 📝
      </h1>

      {role === "pro" ? (
        <div className="text-green-600">
          ✅ Welcome Pro User! You have access to the AI Writing Assistant.
          <p className="mt-2 text-gray-600">
            [Here you'll add LLM features like generating content, summarizing,
            etc.]
          </p>
        </div>
      ) : (
        <div className="text-yellow-600">
          ⚠️ This feature is available only for Pro users.
          <p className="mt-2 text-gray-600">
            Upgrade to the Pro Plan to access the AI Writing Assistant.
          </p>
        </div>
      )}
    </div>
  );
}
