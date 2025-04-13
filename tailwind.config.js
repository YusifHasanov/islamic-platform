/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#007A4C",
                    50: "#EBFAF4",
                    100: "#D0F5E6",
                    200: "#A2EAD0",
                    300: "#74DEB9",
                    400: "#45D3A2",
                    500: "#26C48E",
                    600: "#1C9E74",
                    700: "#007A4C",
                    800: "#00613C",
                    900: "#00472C",
                    950: "#002D1B",
                },
                accent: {
                    DEFAULT: "#F7E652",
                    50: "#FFFDE6",
                    100: "#FFF9C2",
                    200: "#FFF599",
                    300: "#FFEF70",
                    400: "#F7E652",
                    500: "#EBCC1F",
                    600: "#DBAC13",
                    700: "#B7810F",
                    800: "#936315",
                    900: "#7A5117",
                    950: "#422B0D",
                },
            },
            keyframes: {
                "accordion-down": {
                    from: {height: 0},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: 0},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },

        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
};
