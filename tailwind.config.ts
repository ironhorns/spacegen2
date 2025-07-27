import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        card: "#f5f5f5",
        accent: "#4b5563",
        videoBg: "#0d1b2a",
        ctaPrimary: "#3b82f6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        oxanium: ["Oxanium", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
      },
      // Updated animations section
      animation: {
        fadeInDown: "fadeInDown 0.6s ease-out",
        shake: "shake 1.5s ease-in-out infinite",
        float: "float 3s ease-in-out infinite", // <-- Add this line
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        // Add float keyframes
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
