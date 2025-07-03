const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "apps/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['Urbanist', 'sans-serif'],
    },
    fontSize: {
      xs:   ['0.75rem',  { lineHeight: '1.6667' }], //12px
      sm:   ['0.875rem', { lineHeight: '1.5714' }], //14px
      base: ['0.875rem', { lineHeight: '1.5714' }], //14px
      lg:   ['1rem',     { lineHeight: '1.5'    }], //16px
      xl:   ['1.25rem',  { lineHeight: '1.4'    }], //20px
      '2xl':['1.5rem',   { lineHeight: '1.3333' }], //24px
      '3xl':['1.875rem', { lineHeight: '1.2667' }], //30px
      '4xl':['2.375rem', { lineHeight: '1.2105' }], //38px
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
        
        'text-input': '#63637A',
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
  plugins: [
    plugin(function({ addComponents, theme }) {
      addComponents({
        // base btn
        '.btn': {
          display:        'inline-flex',
          alignItems:     'center',
          justifyContent: 'center',
          padding:        `${theme('spacing.1.5')} ${theme('spacing.6')}`, // 6px / 24px
          gap:            theme('spacing.2'),                             // 8px
          height:         '36px',
          borderRadius:   '6px',
          width:          'auto',
          transition:     'transform .2s ease, filter .2s ease',
          transform:      'translateY(0)',
          '&:hover': {
            transform: 'translateY(-2px)',          // lift up by 2px
            filter:    'brightness(0.9)',           // darken slightly
          },
          '&[disabled]': {
            cursor: 'not-allowed',
            filter: 'none',
            transform: 'none',
          },
        },

        // variants…
        '.btn-filled': {
          backgroundColor: theme('colors.primary'),
          color:           theme('colors.on-primary'),
          fontSize:        '14px',
        },
        '.btn-outlined': {
          backgroundColor: theme('colors.white'),
          color:           theme('colors.on-primary'),
          border:          `1px solid ${theme('colors.gray.200')}`,
          fontSize:        '14px',
        },
        '.btn-tonal': {
          backgroundColor: theme('colors.primary-container'),
          color:           theme('colors.on-primary-container'),
          fontSize:        '14px',
        },
        '.btn-inactive': {
          backgroundColor: theme('colors.gray.200'),
          color:           theme('colors.gray.600'),
          fontSize:        '14px',
        },

        // spinner helper (optional)
        '.btn-spinner': {
          display:       'inline-block',
          width:         '1em',
          height:        '1em',
          borderWidth:   '2px',
          borderStyle:   'solid',
          borderRadius:  '9999px',
          borderColor:   'currentColor',
          borderTopColor:'transparent',
          animation:     'spin 1s linear infinite',
        },

        /* ─── INPUT BASE ───────────────────────────────────────────────────────── */
        '.input': {
          display:        'flex',
          alignItems:     'center',
          gap:            '10px',
          width:          '469px',
          height:         '40px',
          padding:        '13px 12px',
          border:         `1px solid ${theme('colors.gray.200')}`,
          borderRadius:   '6px',
          fontSize:       '14px',
          fontWeight:     '400',
          color:          theme('colors["text-input"]'),      // you’ll add this color alias below
          backgroundColor:'white',
          transition:     'border-color .2s ease, filter .2s ease',
          '&::placeholder': {
            color:      theme('colors.gray.600'),
            fontWeight: '400',
            fontSize:   '14px',
          },
          '&:focus': {
            outline:     'none',
            borderColor: theme('colors.gray.900'),
          },
        },

        /* ─── SEARCH INPUT ─────────────────────────────────────────────────────── */
        '.input-search': {
          display:        'flex',
          alignItems:     'center',
          gap:            '8px',
          width:          '469px',
          height:         '40px',
          padding:        '8px 12px',
          border:         `1px solid ${theme('colors.gray.200')}`,
          borderRadius:   '6px',
          fontSize:       '14px',
          fontWeight:     '400',
          color:          theme('colors["text-input"]'),
          backgroundColor:'white',
          transition:     'border-color .2s ease',
          '&::placeholder': {
            color:      theme('colors.gray.600'),
            fontWeight: '400',
            fontSize:   '14px',
          },
          '&:focus': {
            outline:     'none',
            borderColor: theme('colors.gray.900'),
          },
        },
        '.input-search-icon': {
          width:  '16px',
          height: '16px',
          color:  theme('colors.gray.900'),
        },

        /* ─── SELECT ───────────────────────────────────────────────────────────── */
        '.select': {
          position:       'relative',
          display:        'inline-block',
          width:          '469px',
          borderRadius:   '6px',
          backgroundColor:'white',
        },
        '.select > select': {
          appearance:     'none',
          width:          '100%',
          height:         '40px',
          padding:        '13px 36px 13px 12px', // room on right for icon
          border:         `1px solid ${theme('colors.gray.200')}`,
          borderRadius:   '6px',
          fontSize:       '14px',
          fontWeight:     '400',
          color:          theme('colors["text-input"]'),
          backgroundColor:'transparent',
          transition:     'border-color .2s ease',
          '&:focus': {
            outline:     'none',
            borderColor: theme('colors.gray.900'),
          },
        },
        '.select-icon': {
          position:    'absolute',
          right:       '12px',
          top:         '50%',
          transform:   'translateY(-50%)',
          width:       '16px',
          height:      '16px',
          pointerEvents:'none',
          color:       theme('colors.gray.900'),
        },
        '.select-option': {
          padding:           '13px 12px',
          fontSize:          '14px',
          fontWeight:        '400',
          color:             theme('colors["text-input"]'),
          backgroundColor:   'white',
          cursor:            'pointer',
          '&:hover': {
            backgroundColor: theme('colors.gray.50'),
            color:           theme('colors.gray.900'),
          },
        },

        /* ─── FORM & LABEL ────────────────────────────────────────────────────── */
        '.form': {
          display:        'flex',
          flexDirection:  'column',
          gap:            '24px',
        },
        '.form-group': {
          display:        'flex',
          flexDirection:  'column',
          gap:            '4px',
        },
        '.form-label': {
          fontSize:       '12px',
          fontWeight:     '500',
          color:          theme('colors.on-primary'),
        },

        /* ─── FORM & LABEL ────────────────────────────────────────────────────── */
        '.sider-icon': {
          height:  '20px',
          width:  '20px',
          color:   theme('colors.gray.600'),
        },



      })
    }),
  ],

  corePlugins: {
    filter: true,
  },
  
};

