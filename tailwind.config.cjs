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
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(50px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
