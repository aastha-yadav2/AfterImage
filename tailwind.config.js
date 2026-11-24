/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#050505',
        charcoal: {
          950: '#050505',
          900: '#0c0c0c',
          850: '#141414',
          800: '#1a1a1a',
          750: '#262626',
          700: '#333333',
          600: '#4d4d4d',
          500: '#666666',
          400: '#8b8882',
          300: '#b3b0a8',
          200: '#d9d6ce',
          100: '#f4f0e8',
          50: '#faf8f5',
        },
        amber: {
          950: '#1a140a',
          900: '#332612',
          800: '#59411d',
          700: '#8c652b',
          600: '#ad7e37',
          500: '#c69a58',
          400: '#d4b077',
          300: '#e2c696',
          200: '#efdcb8',
          100: '#f7eddc',
          50: '#fcf8f1',
        },
        parchment: {
          900: '#2b2926',
          800: '#47433e',
          700: '#6b665e',
          600: '#8b8882',
          500: '#aba79f',
          400: '#c7c4bd',
          300: '#dedbd5',
          200: '#f0ece4',
          100: '#f4f0e8',
          50: '#faf8f5',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
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
