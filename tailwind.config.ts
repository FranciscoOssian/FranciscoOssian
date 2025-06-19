import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        'internal-phone': '430px',
        'internal-tablet': '749px',
        'internal-desktop': '1020px',
        'mac-air': '1280px',
      },
      screens: {
        'internal-phone': '430px',
        'internal-tablet': '749px',
        'internal-desktop': '1020px',
        'mac-air': '1280px',
      },
      colors: {
        primary: '#86E38F',
        secondary: '#CEE2FF',
        tertiary: '#111618',
      },
      fontFamily: {
        'space-grotesk': ['var(--space_grotesk)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
