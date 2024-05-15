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
        xlg: "37.46px", /*Welcome Back...*/
        lg: "17.03px", /*Glad to see you're back...*/
        md: "12.1px", /*Launch Night*/
        sml: "7.26px", /*Monday 8th April...*/
        xs: "4.98px" /*club Event*/
      },
      letterSpacing: {
        
      },
      fontColor: {
        primary: "#FFFFFF"
      },
      lineHeight: {
        xlg: "43.94px", /*Welcome Back...*/
        lg: "19.97px", /*Glad to see you're back...*/
        md: "14.2px", /*Launch Night*/
        sml: "8.52px", /*Monday 8th April...*/
        xs: "5.84px" /*club Event*/
      },
      colors: {
        primary: {
          background: "#FFFEF9", /*white background*/
          blue: "#3B87DD" /*main page bold blue + dashboard buttons etc*/
        },
        accent: {
          lighter_blue: "#8BB4F9", /*About us button on main page*/
        },
        university: {
          darkblue: "#255894" /*Classic UOA darker blue*/
        },
        dashboard: {
          light_blue_gradient: "linear-gradient(180deg, #D6EDFD 0%, #58B6F1 100%)" /*Dashboard gradient*/
        }
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
