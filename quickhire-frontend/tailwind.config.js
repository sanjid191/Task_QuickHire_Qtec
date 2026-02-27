/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#4640DE',
                accent: '#26A4FF',
                dark: '#202430',
                gray: {
                    50: '#F8F8FD',
                    100: '#E9EBFD',
                    600: '#7C8493',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
