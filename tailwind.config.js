/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      {
        mytheme: {
          primary: "#07ea1a",

          secondary: "#89f992",

          accent: "#7462d1",

          neutral: "#272532",

          "base-100": "#2b374a",

          info: "#92c2dd",

          success: "#2fbc91",

          warning: "#efbd0b",

          error: "#e63d6d",
        },
      },
    ],
  },
};
