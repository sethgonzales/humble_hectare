/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@mantine/core/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#d2e0c8',
        secondary: '#a4ba95',
        water: '#4B6EF5',
        fertilize: '#14B885',
        theme: {
          50: '#f3f9f2',   // Lightest shade
          100: '#e0e8d9',  // Light shade
          200: '#c4d2b7',  // Light-medium shade
          300: '#a7bc94',  // Medium shade
          400: '#8a9f71',  // Dark-medium shade
          500: '#6e8252',  // Dark shade
          600: '#58663d',  // Darker shade
          700: '#4a5232',  // Even darker shade
          800: '#3d4227',  // Very dark shade
          900: '#2f321e',  // Darkest shade
        },
      },
    },
  },
  plugins: [],
}
