/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#172D29',
          900: '#0E1D1A',
          800: '#172D29',
          700: '#1F3C37',
          600: '#274B45',
        },
        moss: {
          DEFAULT: '#213B33',
          dark: '#1A3029',
          light: '#2C4C42',
        },
        sage: {
          DEFAULT: '#87988A',
          light: '#A4B2A6',
          muted: '#C2CCC4',
          faint: 'rgba(135, 152, 138, 0.12)',
        },
        cream: {
          DEFAULT: '#F0EBDD',
          light: '#FAF7EE',
          warm: '#F3EFE4',
          dark: '#E2DAC8',
          card: '#F6F2E7',
          surface: '#ECE5D5',
        },
        sand: {
          DEFAULT: '#D8CBB5',
          light: '#E6DCcb',
          dark: '#C4B49B',
          faint: 'rgba(216, 203, 181, 0.25)',
        },
        gold: {
          DEFAULT: '#B99A6A',
          light: '#CEB184',
          dark: '#9E8053',
          faint: 'rgba(185, 154, 106, 0.15)',
          glow: 'rgba(185, 154, 106, 0.35)',
        },
        charcoal: {
          DEFAULT: '#292B28',
          muted: '#85877F',
          soft: '#4A4D48',
          deep: '#1C1E1B',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Manrope', '"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'academic': '0 4px 20px -2px rgba(23, 45, 41, 0.08), 0 2px 6px -1px rgba(23, 45, 41, 0.04)',
        'academic-lg': '0 12px 32px -4px rgba(23, 45, 41, 0.12), 0 4px 12px -2px rgba(23, 45, 41, 0.06)',
        'academic-gold': '0 0 0 1px rgba(185, 154, 106, 0.25), 0 8px 24px -4px rgba(23, 45, 41, 0.1)',
        'academic-dark': '0 8px 28px -4px rgba(14, 29, 26, 0.4), 0 2px 8px -2px rgba(14, 29, 26, 0.2)',
        'gold-glow': '0 0 16px rgba(185, 154, 106, 0.3)',
      },
      borderRadius: {
        'academic': '10px',
        'academic-lg': '14px',
      },
    },
  },
  plugins: [],
}
