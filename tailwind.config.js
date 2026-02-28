/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave"],
    darkTheme: "dark",           // default dark theme হিসেবে "dark" ব্যবহার হবে
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}