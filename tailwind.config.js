/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        display: ["Clash Display", "Sora", "sans-serif"],
      },
    },
  },
  plugins: [],
};
