/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // adjust as needed
    ],
    theme: {
        extend: {
            keyframes: {
                rotate360: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
            animation: {
                spinSlow: 'rotate360 3s linear infinite',
            },
        },
    },
    plugins: [],
}
