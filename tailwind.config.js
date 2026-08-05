/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFC',
        surface: '#FFFFFF',
        primary: {
          DEFAULT: '#4F46E5', // Indigo 600
          hover: '#4338CA',
          light: '#EEF2FF',
        },
        success: {
          DEFAULT: '#10B981', // Emerald 500
          light: '#ECFDF5',
        },
        glass: 'rgba(255, 255, 255, 0.7)',
        'glass-border': 'rgba(255, 255, 255, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(79, 70, 229, 0.3)',
      },
    },
  },
  plugins: [],
}
