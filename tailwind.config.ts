import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        temp_font: "var(--temp-font-color)",
        temp_basic: "var(--temp-basic-color)",
        temp_board: "var(--temp-board-color)",
        primary: "var(--primary)",
      },
    },
  },
  plugins: [],
} satisfies Config;
