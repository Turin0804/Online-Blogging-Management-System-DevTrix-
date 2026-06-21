import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                accent: "#F8F1E7 ",
            },

            fontFamily: {
                grenze: ["Grenze Gotisch", "serif"],
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            {
                light: {
                    background: "#fff",
                },
            },
            {
                dark: {
                    background: "#333",
                },
            },
        ],
    },
};
