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
                    }
                }
            },
            animation: {
                wiggle: 'wiggle 3s ease-in-out infinite',
            }
    },
  },
  plugins: [],
}

