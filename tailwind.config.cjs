/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gap: {
        responsive: {
          sm: "1rem",
          md: "2rem",
          lg: "4rem",
          xl: "8rem",
        },
      }
    },
  },
  plugins: [],
};
