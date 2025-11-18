/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#111827", 
          800: "#374151",
          700: "#444444", 
          650: "#4B5563",
          600: "#6B7280", 
          500: "#CCCCCC",
          400: "#b3b4b6ff", 
          300: "#D1D5DB", 
          200: "#CCCCCC",
          150: "#E5E7EB",
          100: "#F3F4F6",
          40: "#F9FAFB",
        },
        primary: {
          50: "#fef2f2",
          100: "#FEE2E2",
          200: "#F2DDE0",
          500: "#DC2626",
          600: "#C30218",
          700: "#b91c1c",
          
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontWeight: {
        medium: '550',
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(to right, #C30218, #F13B07)',
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      fontSize: {
        xsmall: "10.2px",
        xsplus: "11.9px",
        semixl: "17px",
        xl: "24px",
        "4xl": "48px",
      },
      boxShadow: {
        "auth-card": "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
}
