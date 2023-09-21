/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        new: ["Noto Sans Hebrew", "sans - serif"],
      },
      backgroundImage: {
        banner1: "url('./src/assets/images/banner1.png')",
      },
    },
  },
  plugins: [],
};
