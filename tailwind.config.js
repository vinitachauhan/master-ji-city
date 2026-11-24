/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        kid: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        sans: ['Poppins', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
      },
      colors: {
        neon: '#39FF14',
        navy: { 900: '#0a1230', 800: '#111c45', 700: '#1a2a5e' },
      },
      boxShadow: {
        pop: '0 6px 0 0 rgba(0,0,0,0.18)',
        neon: '0 0 18px rgba(57,255,20,0.35)',
      },
    },
  },
  plugins: [],
};
