/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      images: {
        domains: ['https://ehlisunne.az'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
     require('tailwind-scrollbar'),
     require('@tailwindcss/aspect-ratio'),
   ],
}