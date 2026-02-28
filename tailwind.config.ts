import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#f7f4ef',
          50:  '#fdfcfa',
          100: '#f7f4ef',
          200: '#efe9df',
          300: '#e5ddd0',
          400: '#c8bfb0',
        },
        terra: {
          light:   '#e8876a',
          DEFAULT: '#c4623a',
          dark:    '#a04e2c',
        },
        stone: '#9e9488',
        ink:   '#1e1a15',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft':    '0 2px 24px rgba(60,40,20,0.08)',
        'soft-lg': '0 8px 48px rgba(60,40,20,0.13)',
        'terra':   '0 4px 16px rgba(196,98,58,0.35)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(1.3)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
