module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-xl': '0 25px 20px -12px rgb(0 0 0 / 0.25), 0 0px 10px -12px rgb(0 0 0 / 0.25), 25px 0 50px -12px rgb(0 0 0 / 0.25), -25px 0 50px -12px rgb(0 0 0 / 0.25)',
      },
    },
  },
};