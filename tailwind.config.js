/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'google-blue': '#1a73e8',
        'google-blue-hover': '#1557b0',
        'google-grey': '#5f6368',
        'google-light-grey': '#f8f9fa',
        'google-border': '#dadce0',
        'google-text': '#3c4043',
        'google-text-secondary': '#5f6368'
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
        google:
          '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
        'google-lg':
          '0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)'
      }
    }
  },
  plugins: []
}
