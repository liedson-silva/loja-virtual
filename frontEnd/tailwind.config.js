/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-100": "#60a5fa",
        "secondary-100": "#2563eb",
        "tertiary-100": "#0b1a78",
      }
    },
  },
  plugins: [],
}

