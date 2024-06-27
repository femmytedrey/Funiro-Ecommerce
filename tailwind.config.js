/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryText: "#3a3a3a",
        primary: "#B88E2F",
        textGrey: '#666666',
      },
    },
  },
  plugins: [],
};
