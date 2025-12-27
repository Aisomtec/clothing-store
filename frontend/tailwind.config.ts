// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // extend: {
    //   colors: {
    //     brand: {
    //       DEFAULT: "#F2C94C", 
    //     },

    //     brandGradient: {
    //       from: "#F97316",

    //       to: "#FACC15",  
    //     },

    //     dark: "#0b0b0b",
    //   },
    // }


    extend: {
      colors: {
        brand: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FACC15", // MAIN BRAND COLOR
          500: "#EAB308",
          600: "#CA8A04",
          700: "#A16207",
        },

        dark: "#0b0b0b",
      },
    },


  },
  plugins: [],
};

export default config;



