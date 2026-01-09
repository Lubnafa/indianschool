/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        charcoal: "#1C1C1C",
        stone: "#E6DED3",

        saffron: "#C89B3C",
        vermilion: "#8C2F1D",
        peacock: "#1F5E63",

        lotus: "#E8C4B8",
        ash: "#6B5E55",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        goldGlow: "0 0 40px rgba(200, 155, 60, 0.15)",
      },
    },
  },
  plugins: [],
}

