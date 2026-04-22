import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0d1117',
        surface: '#161b22',
        'surface-hover': '#1c2128',
        border: '#21262d',
        accent: '#00e5a0',
        'accent-dim': '#00c488',
        purple: '#a855f7',
        amber: '#f59e0b',
        pink: '#ec4899',
        blue: '#3b82f6',
        'text-primary': '#e2e8f0',
        'text-secondary': '#8b949e',
        'text-muted': '#484f58',
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'Fira Code', 'monospace'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-in-left': 'slideInLeft 0.4s ease forwards',
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(circle, #21262d 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
    },
  },
  plugins: [],
};

export default config;
