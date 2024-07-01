/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mlg: "980px",
        mmd: "850px",
        midBreak: "768px",
        nextMidBreak: "850px",
        mobile: "550px",
      },
      colors: {
        primaryText: "#3a3a3a",
        primary: "#B88E2F",
        primaryLight: "#FCF8F3",
        textGrey: "#666666",
        textGreyLight: "#898989",
      },
    },
  },
  plugins: [],
};
