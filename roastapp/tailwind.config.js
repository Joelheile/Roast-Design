/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
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
				hover: "#f5f5f5",
				primary: "#4D47C3",
				primaryLight: "#F0EFFF",
				primaryMid: "#A7A3FF",
				primaryHover: "#534cd4",
				secondary: "#EEA47FFF",
				neutral: "#FCF6F5FF",
				black: "#1a1a1a",
				white: "#ffffff",
				grey: "#ededed",
				darkgrey: "#757575",
				// https://webflow.com/blog/best-color-combinations
			},
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
				dongle: ["Dongle", "sans-serif"],
			},
			spacing: {
				"8xl": "96rem",
				"9xl": "128rem",
			},
		},
		container: {
			// automaticlly to all containers
			center: true,
			padding: "1.5rem",
		},
	},
	plugins: [require("@tailwindcss/aspect-ratio")],
};
