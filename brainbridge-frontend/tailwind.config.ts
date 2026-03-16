import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kids: {
          'indigo': '#4f46e5',
          'indigo-dark': '#3730a3',
          'indigo-light': '#818cf8',
          'rose': '#f43f5e',
          'rose-dark': '#be123c',
          'rose-light': '#fb7185',
          'amber': '#fbbf24',
          'amber-dark': '#b45309',
          'amber-light': '#fcd34d',
          'emerald': '#10b981',
          'emerald-dark': '#047857',
          'emerald-light': '#34d399',
          'sky': '#38bdf8',
          'sky-dark': '#0369a1',
          'sky-light': '#7dd3fc',
          'violet': '#8b5cf6',
          'violet-dark': '#6d28d9',
          'violet-light': '#a78bfa',
        },
        primary: {
          DEFAULT: "#4f46e5", 
          light: "#818cf8",
          dark: "#3730a3",
        },
        secondary: {
          DEFAULT: "#f43f5e",
          light: "#fb7185",
          dark: "#be123c",
        },
        accent: {
          amber: "#fbbf24",
          emerald: "#10b981",
          sky: "#38bdf8",
          violet: "#8b5cf6",
        },
        background: "#f8fafc", // Very light slate/blue hint for freshness
        success: "#10b981",
        danger: "#f43f5e",
        warning: "#fbbf24",
        slate: {
          950: "#020617",
        },
      },
      animation: {
        'blob': 'blob 10s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-warm': 'pulse-warm 4s ease-in-out infinite',
        'bounce-playful': 'bounce-playful 1s ease-in-out infinite',
        'wiggle-slow': 'wiggle 2s ease-in-out infinite',
        'spin-very-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(50px, -70px) scale(1.1)' },
          '66%': { transform: 'translate(-40px, 40px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        },
        'pulse-warm': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.98)' },
        },
        'bounce-playful': {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)' },
          '50%': { transform: 'translateY(-10px) scaleY(0.98)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        lg: '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'playful': '0 8px 0 0 rgba(0, 0, 0, 0.05)',
        'playful-hover': '0 4px 0 0 rgba(0, 0, 0, 0.05)',
        'glow-indigo': '0 0 25px rgba(79, 70, 229, 0.3)',
        'glow-rose': '0 0 25px rgba(244, 63, 94, 0.3)',
        'glow-amber': '0 0 25px rgba(251, 191, 36, 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;
