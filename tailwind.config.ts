import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#586F75",
        ink: "#2F3A3D",
        leaf: "#6F8F72",
        coral: "#A96A55",
        gold: "#C7A76C",
        mist: "#F6F1E7",
        paper: "#FFFDF7",
        text: "#30383B",
        muted: "#6B7280",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 42, 67, 0.08)",
        lift: "0 28px 70px rgba(6, 26, 47, 0.14)",
        editorial: "0 30px 90px rgba(6, 26, 47, 0.16)",
      },
      fontFamily: {
        display: [
          "Playfair Display",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
