import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0F1117',
        surface: '#171A23',
        elevated: '#1E2230',
        elevated2: '#262B3B',
        line: '#2A2F3E',
        amber: {
          DEFAULT: '#F5A623',
          soft: '#FFC966',
          dim: '#8A6220',
        },
        teal: {
          DEFAULT: '#2DD4BF',
          dim: '#1B7A6E',
        },
        danger: {
          DEFAULT: '#F2545B',
          dim: '#7A2A2E',
        },
        success: '#34D399',
        ink: {
          hi: '#EDEEF2',
          mid: '#AEB2C2',
          low: '#6E7385',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(245,166,35,0.25), 0 0 24px -4px rgba(245,166,35,0.35)',
        'glow-teal': '0 0 0 1px rgba(45,212,191,0.25), 0 0 24px -4px rgba(45,212,191,0.35)',
        card: '0 1px 0 0 rgba(255,255,255,0.03), 0 8px 20px -12px rgba(0,0,0,0.6)',
        sheet: '0 -8px 30px -8px rgba(0,0,0,0.6)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.28s cubic-bezier(0.16,1,0.3,1)',
        'fade-in': 'fade-in 0.2s ease-out',
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
