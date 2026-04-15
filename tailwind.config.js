/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "spin-slow-reverse": "spin 25s linear infinite reverse",
      },
      perspective: {
        1000: "1000px",
      },
    },
  },
  plugins: [],
};
