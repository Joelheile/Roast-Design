/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
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
			white: "#FFFFF",
			// https://webflow.com/blog/best-color-combinations
		},
		fontFamily: {
			sans: ["Graphik", "sans-serif"],
			serif: ["Merriweather", "serif"],
		},
		extend: {
			spacing: {
				128: "32rem",
				144: "36rem",
			},
			borderRadius: {
				"4xl": "2rem",
			},
		},
	},
	plugins: [],
};
