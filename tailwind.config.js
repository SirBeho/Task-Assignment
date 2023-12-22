import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                'ubuntu': ['Ubuntu', 'sans-serif'],
              },
            colors: {
                customGray: "#f7f7f7",
                offwhite: "#ffffff",
                softgray: "#f2f2f2",
                darkgray: "#57687a",
                textgray: "#767171",
                darkblue: "#011f5e",
                softblue: "#0099ff",
                nav: "#405163",
                upload: "#57a844",
                iconssvg: "#cacdd7",
            },
        },
    },

    plugins: [
        require("flowbite/plugin")({
            charts: true,
        }),

        forms,
    ],
};
