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
              DEFAULT: '#d91cc6',
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
