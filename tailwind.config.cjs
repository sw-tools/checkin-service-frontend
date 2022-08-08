/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        "emerald-customized": {
          ...require("daisyui/src/colors/themes")["[data-theme=emerald]"],
          "--btn-text-case": "none",
          primary: "#4e46dc",
        },
      },
    ],
  },
};
