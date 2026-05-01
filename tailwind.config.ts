import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#203078",
          dark: "#182560",
          darker: "#101848",
        },
        "yellow-green": "#c8d828",
        "yellow-accent": "#d4b800",
      },
      fontFamily: {
        display: ["Anton", "Impact", "sans-serif"],
        heading: ["Oswald", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-oswald)", "Oswald", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
