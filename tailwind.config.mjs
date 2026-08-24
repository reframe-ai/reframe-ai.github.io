export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        main: '#2D2B27',
        bg_cream: '#FAFAFA',
        bg_dark: '#171412',
        accent: '#F4581C',
        accent_deep: '#C93E0C',
        accent_tint: '#FDEBE0',
        sub: '#6B6560',
        card_bg: '#F2F2F2',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}
