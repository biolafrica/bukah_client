module.exports = {
  content: [
    "apps/**/*/pages/**/*.{js,jsx,ts,tsx}",
    "apps/**/*/components/**/*.{js,jsx,ts,tsx}",
    "apps/mobile-ops-app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Urbanist', 'sans-serif'],
    },
    fontSize: {
      xs:   ['0.75rem',  { lineHeight: '1.6667' }],
      sm:   ['0.875rem', { lineHeight: '1.5714' }],
      base: ['0.875rem', { lineHeight: '1.5714' }],
      lg:   ['1rem',     { lineHeight: '1.5'    }],
      xl:   ['1.25rem',  { lineHeight: '1.4'    }],
      '2xl':['1.5rem',   { lineHeight: '1.3333' }],
      '3xl':['1.875rem', { lineHeight: '1.2667' }],
      '4xl':['2.375rem', { lineHeight: '1.2105' }],
    },
    extend: {
      colors: {
        // Primary / container tokens
        'primary-container':     '#CDE0DF',
        'on-primary-container':  '#243837',
        primary:                 '#A8DF46',
        'on-primary':            '#1c274c',

        // Success (green) variants
        success: {
          DEFAULT: '#36a70c',
          dark:    '#0d875a',
        },

        // Error / red variants
        error: {
          DEFAULT: '#b52e25',
          dark:    '#ac0f05',
        },

        // your existing gray palette...
        gray: {
          900: '#1c274c', // primary text
          600: '#7984a9', // secondary text
          400: '#9494A9', // disabled text
          200: '#e2e6e9', // border text
          100: '#e7edf1', // seperator text
          50:  '#f5f5f6', // layout bg
        },
      },
    },
  },
  plugins: [],
};

