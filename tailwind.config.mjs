export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1D1F24',
        sub: '#5E6168',
        line: '#E3E4E0',
        surface: '#F4F4F1',
        accent: '#F4581C',
        accent_deep: '#C93E0C',
        accent_tint: '#FDEBE0',
      },
    },
  },
  plugins: [],
}
