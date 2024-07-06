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
        pea: "#7f3f98", // สีดำ
        greencut: "#7bae6a", 
        greencut1: "#397d54", 
      },
    },
  },
};
export default config;
