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
      color: {
        primary: ["#338573"],
      },
      screens: {
        sm: "320x", // Small screens
        md: "480px", // Medium screens
        lg: "768px", // Large screens
        xl: "1024px", // Extra-large screens
      },
    },
  },
  plugins: [],
};
