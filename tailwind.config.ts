// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#F2C94C", // keep for now (fallback)
        },

        brandGradient: {
          from: "#F97316", // orange
          // via: "#EF4444",  // red
          to: "#FACC15",   // yellow
        },

        dark: "#0b0b0b",
      },
    }

  },
  plugins: [],
};

export default config;



