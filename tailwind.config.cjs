module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-purple": "rgb(127, 79, 160)", // Light Mode Background
        "primary-green-bright": "rgb(55, 180, 74)", // Light Mode Text
        "primary-green-dark": "rgb(39, 48, 36)",
        "primary-green": "rgb(55, 67, 52)",
        "primary-red": "rgb(187, 32, 37)", // Light Mode Input
        "primary-brown": "rgb(155, 78, 55)",
        "primary-brown-dark": "rgb(155, 78, 55)",
        "primary-blue": "rgb(58, 78, 155)",
        "primary-gold": "rgb(233, 184, 32)", // Dark Mode Background
        white: "hsl(0, 0%, 100%)", // Dark Mode Text & Light Mode Elements
      },
      fontFamily: {
        nerko: ["Nerko One", "arial"],
        comforta: ["Comfortaa", "monospacel"],
      },
      backgroundImage: {
        xmas: "url('./assets/wallpaper.webp')",
      },
      screens: {
        xs: "350px",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    // ...
  ],
};
