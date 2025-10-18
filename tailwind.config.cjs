/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        kbpurple: "#751662",
        kbbeige: "#f2d9a0",
        kbdark: "#560b18",
        kbred: "#a31f3f",
        kbcream: "#f2e5c6",
      },
    },
  },
  plugins: [],
};
