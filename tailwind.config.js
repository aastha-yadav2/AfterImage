/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#090807',
          900: '#110f0e',
          850: '#171513',
          800: '#1f1c19',
          750: '#282420',
          700: '#342f2b',
          600: '#48423d',
          500: '#635c55',
          400: '#8a8279',
          300: '#b2aaa1',
          200: '#d7d0c7',
          100: '#ede8e1',
          50: '#f7f4ef',
        },
        amber: {
          950: '#2b1b07',
          900: '#4a300e',
          800: '#754a17',
          700: '#9e641e',
          600: '#c58128',
          500: '#df9c3b',
          400: '#eeb35a',
          300: '#f6ca84',
          200: '#fbe2b5',
          100: '#fdf1dc',
          50: '#fef9f1',
        },
        parchment: {
          900: '#3e372e',
          800: '#5c5245',
          700: '#7d705f',
          600: '#9e907d',
          500: '#b8ab99',
          400: '#d1c6b6',
          300: '#e3dacf',
          200: '#f0eae1',
          100: '#f7f4ee',
          50: '#fdfbf7',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grain-overlay': 'radial-gradient(circle at 50% 0%, rgba(223, 156, 59, 0.08) 0%, transparent 60%)',
        'parchment-glow': 'radial-gradient(circle at top right, rgba(227, 218, 207, 0.04) 0%, transparent 50%)',
      },
      boxShadow: {
        'antique': '0 4px 20px -2px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(223, 156, 59, 0.15)',
        'amber-subtle': '0 0 25px -5px rgba(223, 156, 59, 0.18)',
        'card-dark': '0 10px 30px -10px rgba(0,0,0,0.8), 0 1px 0 0 rgba(255,255,255,0.03) inset',
      },
    },
  },
  plugins: [],
}
