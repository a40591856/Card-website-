import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grass: {
          50: "#f1f7f0",
          100: "#e1efe0",
          200: "#c4e2c2",
          300: "#9ccd9a",
          400: "#6fb772",
          500: "#4caf50",
          600: "#43a047",
          700: "#388e3c",
          800: "#2e7d32",
        },
        ink: {
          900: "#1c2a1c",
          600: "#4c5b4c",
          400: "#8b988b",
        },
      },
    },
  },
  plugins: [],
};

export default config;
