/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./node_modules/flowbite/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/**/*.jsx",
    ],
    theme: {
        extend: {
            fontFamily: {
                dancing: ['"Dancing Script"', "cursive"],
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
