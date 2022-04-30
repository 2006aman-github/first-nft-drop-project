module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-1deg) translateX(3px) translateY(3px)',
          },

          '50%': {
            transform: 'translateX(-3px) translateY(-3px)',
          },
        },
        popIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0)',
            transform: 'translate(-20px, -10px)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
        popOut: {
          '0%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '100%': {
            opacity: 0,
            transform: 'scale(0)',
            transform: 'translate(-20px, -10px)',
            visibility: 'hidden',
          },
        },
      },
      transitionProperty: {
        visibility: 'visibility 0s 2s',
        opacity: 'opacity 2s',
      },
      animation: {
        wiggle: 'wiggle 3s ease-in-out infinite',
        popIn: 'popIn .3s ease-in-out',
        popOut: 'popOut .2s ease-in-out',
      },
    },
  },
  plugins: [],
}
