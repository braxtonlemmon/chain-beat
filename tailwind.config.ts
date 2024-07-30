import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
    },
    colors: {
      background: '#222831',
      cardBackground: '#31363F',
      primaryText: '#EEE',
      primaryButton: '#76ABAE',
      accent: '#c66c23',
      lightAccent: '#D2B490',
      header: '#786965',
    },
  },
  plugins: [],
}
export default config
