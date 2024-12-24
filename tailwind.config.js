/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        text: {
          light: "rgb(17 24 28)",
          dark: "rgb(236 237 238)",
        },
        background: {
          light: "rgb(255 255 255)",
          dark: "rgb(21 23 24)",
        },
        tint: {
          light: "rgb(10 126 164)",
          dark: "rgb(255 255 255)",
        },
        icon: {
          light: "rgb(104 112 118)",
          dark: "rgb(155 161 166)",
        },
      },
    },
  },
};
