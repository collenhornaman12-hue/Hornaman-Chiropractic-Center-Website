import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-oswald)", "Oswald", "sans-serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#1a5c8a",
          dark: "#0f3a57",
          darker: "#134a72",
        },
        "yellow-green": {
          DEFAULT: "#8fb339",
          light: "#a8cc45",
          dark: "#738f2d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
