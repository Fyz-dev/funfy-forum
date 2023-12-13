import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      maxWidth: {
        page: '1024px',
        smpage: '800px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      prefix: 'nextui', // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      themes: {
        light: {
          layout: {},
          colors: {},
        },
        dark: {
          layout: {},
          colors: {
            // background: {
            //   DEFAULT: '#111111',
            // },
            // content1: {
            //   DEFAULT: '#1d1d1d',
            // },
            primary: {
              50: '#ffe5ff',
              100: '#FDD1E8',
              200: '#FBA3DA',
              300: '#F374CF',
              400: '#E850CB',
              500: '#D91CC6',
              600: '#BA14B9',
              700: '#900E9C',
              800: '#69087D',
              900: '#4D0568',
              DEFAULT: '#D91CC6',
              foreground: '#FFFFFF',
            },
            focus: '#BEF264',
          },
        },
      },
    }),
  ],
};

export default config;
