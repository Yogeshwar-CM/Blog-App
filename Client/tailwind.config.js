// tailwind.config.js

module.exports = {
  mode: "jit", // Just-In-Time mode for faster build times
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // Purge unnecessary styles in production
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}, // Extend the default Tailwind CSS theme here
  },
  variants: {
    extend: {}, // Extend Tailwind CSS variants here
  },
  plugins: [], // Additional Tailwind CSS plugins
};
