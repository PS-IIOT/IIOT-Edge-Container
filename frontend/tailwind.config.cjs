/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                //default colors
                grey: '#979696dc',
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
        },
    },
    plugins: [],
};
