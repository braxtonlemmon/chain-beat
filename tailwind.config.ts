import type {Config} from 'tailwindcss'
import {fontFamily} from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      notoSans: ['var(--font-notoSans)'],
      fjalla: ['var(--font-fjallaOne)'],
    },
    colors: {
      background: '#222831',
      cardBackground: '#31363F',
      primaryText: '#EEE',
      primaryButton: '#76ABAE',
      accent: '#c66c23',
      lightAccent: '#D2B490',
      header: '#786965',
      error: '#a57878',
      hyperlink: '#aeaeef',
      tableRow: '#4a4a4a',
    },
  },
  plugins: [],
}
export default config
