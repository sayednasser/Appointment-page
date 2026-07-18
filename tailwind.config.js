/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0EA5E9',
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },
        ink: {
          DEFAULT: '#0B2436',
          soft: '#3E5A6E',
        },
        surface: {
          DEFAULT: '#F6F8FA',
          card: '#FFFFFF',
          sidebar: '#0B2436',
        },
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(circle, rgba(14,165,233,0.14) 1px, transparent 1px)',
        'arc-glow':
          'radial-gradient(120% 120% at 50% 0%, rgba(14,165,233,0.16) 0%, rgba(255,255,255,0) 60%)',
      },
      backgroundSize: {
        'dot-sm': '18px 18px',
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(2, 132, 199, 0.18)',
        floaty: '0 20px 60px -15px rgba(2, 132, 199, 0.35)',
      },
      borderRadius: {
        arc: '2rem 2rem 0.5rem 0.5rem',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out both',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
