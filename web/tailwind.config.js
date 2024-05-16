import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [daisyui],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans']
      },
      fontSize: {
        lg: "18px", 
        md: "16px", 
        sm: "14px",
      },
      letterSpacing: {
        lg: "48px",
        md: "32px",
        sm: "24px"
      },
      fontColor: {
        primary: "#000000"
      },
      lineHeight: {
        lg: "18px", /*Glad to see you're back...*/
        md: "16px", /*Launch Night*/
        sm: "14px", /*Monday 8th April...*/
      },
      colors: {
        primary: "#3B87DD", /* blue */
        "primary-dark": "#255894", /* dark blue */
        "primary-light": "#8BB4F9", /* light blue */
        secondary: "#F2504B", /* red */
        "secondary-light": "#FE8686", /* light red */
        neutral: "#FFFEF9", /* basically white */
        "neutral-tan": "#FAF6EB", /* tan color */
        black: "#33342E", /* lighter black */
        grey: "#818181" /* grey */ 
      }
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...themes['light'],
          accent: '#087df1',
        },
        dark: {
          ...themes['dark'],
          accent: '#087df1',
        },
      },
    ],
  },
};
