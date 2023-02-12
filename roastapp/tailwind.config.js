/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        transparent: "transparent",
        primary: "#2F3C7E",
        primaryLight: "#8AAAE5",
        secondary: "#EEA47FFF",
        neutral: "#FCF6F5FF",
        black: "#1a1a1a",
        white: "#ffffff",
        // https://webflow.com/blog/best-color-combinations
      },
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
    },
    container: { // automaticlly to all containers
      center: true,
      padding: "1.5rem",
    },
  },
  plugins: [],
}