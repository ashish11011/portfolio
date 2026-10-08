import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-schibsted)", "Schibsted Grotesk", "Arial", "sans-serif"],
      mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      serif: ["Times", "Times New Roman", "serif"],
    },
    fontSize: {
      xs: ["12px", { lineHeight: "18px" }],
      sm: ["14px", { lineHeight: "24px" }],
      base: ["16px", { lineHeight: "24px" }],
      "2xl": ["24px", { lineHeight: "32px" }],
    },
    fontWeight: { light: "300", normal: "400", medium: "500" },
    boxShadow: { sm: "none", DEFAULT: "none", md: "none", lg: "none", xl: "none", none: "none" },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: { lg: "10px", md: "8px", sm: "6px" },
    },
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: "class",
};

export default config;
