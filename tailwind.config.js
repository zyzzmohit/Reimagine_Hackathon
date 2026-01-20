/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        youtube: {
          red: "#FF0000",
          black: "#0F0F0F",
          dark: "#0F0F0F",
          gray: "#272727",
          light: "#F1F1F1",
          hover: "#3F3F3F",
        },
      },
    },
  },
  plugins: [],
};
