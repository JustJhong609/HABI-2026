/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        field: {
          50: "#f4f8ed",
          100: "#dce9c5",
          500: "#4d7c0f",
          700: "#365314"
        },
        earth: {
          100: "#f6efe3",
          500: "#8b5a2b",
          700: "#5e3b1f"
        }
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Poppins'", "sans-serif"]
      }
    }
  },
  plugins: []
};
