/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark theme colors for Google Flights
        'google-blue': '#8ab4f8',
        'google-blue-hover': '#93baf9',
        'google-blue-accent': '#4285f4',
        'google-grey': '#9aa0a6',
        'google-light-grey': '#202124',
        'google-dark-grey': '#303134',
        'google-darker-grey': '#171717',
        'google-border': '#3c4043',
        'google-border-light': '#5f6368',
        'google-text': '#e8eaed',
        'google-text-secondary': '#9aa0a6',
        'google-text-muted': '#5f6368',
        'google-bg-primary': '#202124',
        'google-bg-secondary': '#303134',
        'google-bg-elevated': '#292a2d',
        'google-surface': '#303134',
        'google-surface-variant': '#3c4043'
      },
      fontFamily: {
        google: [
          'Google Sans',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ]
      },
      boxShadow: {
        google: '0 1px 2px 0 rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)',
        'google-lg':
          '0 1px 2px 0 rgba(0,0,0,.3), 0 2px 6px 2px rgba(0,0,0,.15)',
        'google-dark': '0 2px 10px 0 rgba(0,0,0,.5), 0 1px 4px 0 rgba(0,0,0,.3)'
      }
    }
  },
  plugins: []
}
