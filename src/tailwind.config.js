/** @type {import('tailwindcss').Config} */
module.exports = {
    // Specify the files where Tailwind should look for classes
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}", // Include if using App Router
    ],
    // Customize the theme
    theme: {
      extend: {
        // Override the default font families
        fontFamily: {
          sans: ['Poppins', 'sans-serif'], // Sets Poppins as the default sans-serif font
          // Optional: You can also define other font families
          serif: ['Georgia', 'serif'],
          mono: ['Menlo', 'monospace'],
        },
      },
    },
    // Add any Tailwind plugins (optional)
    plugins: [],
  };