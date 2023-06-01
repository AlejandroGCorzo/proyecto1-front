/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xsm: "300px",
      sm: "640px",
      md: "780px",
      lg: "1026px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        header: "#1c1c1c",
        nav: "#3e3e3e",
        mark: "#23b9d6",
        grid: "#fbc827",
        dash: "#5c5cff",
        orange: "#ed6800",
        grey: "#f5f5f5",
        fontGrey: "#e4e4e4",
      },
    },
  },
  plugins: [require("daisyui")],
};
