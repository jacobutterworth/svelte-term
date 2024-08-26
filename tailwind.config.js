/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {}
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			// {
			// 	mytheme: {
			// 		primary: "#dbf1ff",
			// 		"primary-content": "#111416",
			// 		secondary: "#ffacff",
			// 		"secondary-content": "#160b16",
			// 		accent: "#43ffff",
			// 		"accent-content": "#011616",
			// 		neutral: "#f6ffff",
			// 		"neutral-content": "#151616",
			// 		"base-100": "#ffffff",
			// 		"base-200": "#d8dede",
			// 		"base-300": "#b8bebe",
			// 		"base-content": "#151616",
			// 		info: "#41ffff",
			// 		"info-content": "#011616",
			// 		success: "#9affdc",
			// 		"success-content": "#091611",
			// 		warning: "#fff129",
			// 		"warning-content": "#161401",
			// 		error: "#ffbab9",
			// 		"error-content": "#160d0d"
			// 	}
			// }
			"corporate"
		]
	},
	darkMode: ["class", '[data-theme="dark"]']
};
