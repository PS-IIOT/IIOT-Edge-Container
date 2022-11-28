/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        colors: {
            //default colors
            black: 'black',
            grey: '#979696dc',
            green: '#22c55e',
            white: '#ffffff',

            //Color header component
            ColorStatusConnectionOnline: '#22c55e',
            ColorStatusConnectionOffline: 'red',
            ColorHeaderBackground: '#6B94B1',

            //color App component
            ColorAppBackground: '#a0d2eb',

            //color Card component
            ColorCardBackground: '#979696dc',
            ColorCardTopBottom: '#6B94B1',

            //color footer comonent
            ColorFooterBackground: '#6B94B1',
        },
        extend: {},
    },
    plugins: [],
};
