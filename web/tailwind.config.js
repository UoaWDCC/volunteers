/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    require('tailwindcss-themer')
    ({
    defaultTheme: {
      // put the default values of any config you want themed
      // just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
      extend: {
        colors: {
          primary: "#3B87DD", /* blue */
          "primary-dark": "#255894", /* dark blue */
          "primary-light": "#8BB4F9", /* light blue */
          secondary: "#F2504B", /* red */
          "secondary-light": "#FE8686", /* light red */
          neutral: "#FFFEF9", /* basically white */
          "neutral-tan": "#FAF6EB", /* tan color */
          black: "#33342E", /* lighter black */
          grey: "#818181", /* grey */ 
          lightGrey: "#D9D9D9", /* light grey */
          blueButtonHover: "#60ABF6",
          "greybg": "#6E7780", /*light grey bg for form*/
        },
        fontSize: {
          'number': ['80px', {
            lineHeight: '120%',
            letterSpacing: '0%',
            fontWeight: '700', // 700 is bold
          }],
          'heading': ['48px', {
            lineHeight: '120%',
            letterSpacing: '0%',
            fontWeight: '700',
          }],
          'subheading': ['32px', {
            lineHeight: '120%',
            letterSpacing: '0%',
            fontWeight: '600', // using 'semibold' doesn't work
          }],
          'body': ['24px', {
            lineHeight: '120%',
            letterSpacing: '0%',
            fontWeight: '500', // 500 = 'medium'
          }],
          'detail': ['16px', {
            lineHeight: '120%',
            letterSpacing: '0%',
            fontWeight: '600', // semibold has weight 600 acording to tailwind docs
          }],
          'section-header': ['26px', {
            lineHeight: '120%',
            letterSpacing: '0%',
            fontWeight: '700', // 700 = 'bold'
          }],
        },
        fontFamily: {
          serif: ["Lora", "serif"],
          sans: ["Poppins", "sans-serif"], // sans is the default font if no font family is defined
          mono: ["Roboto Mono", "monospace"],
        }
      }
    },
    themes: [
      {
        // name your theme anything that could be a valid css class name
        // remember what you named your theme because you will use it as a class to enable the theme
        name: 'dashboard', // INCOMPLETE
        // put any overrides your theme has here
        // just as if you were to extend tailwind's theme like normal https://tailwindcss.com/docs/theme#extending-the-default-theme
        extend: {
          colors: {
            primary: "#3B87DD", /* blue */
            "white-background": "#F5F5F5", 
          },
          fontSize: {
            'heading': ['72px', {
              lineHeight: '110%',
              letterSpacing: '0%',
              fontWeight: '700', // 700 is bold
            }],
            'heading': ['48px', {
              lineHeight: '120%',
              letterSpacing: '0%',
              fontWeight: '700',
            }],
            'subheading': ['32px', {
              lineHeight: '120%',
              letterSpacing: '0%',
              fontWeight: '700', 
            }],
            'body': ['14px', {
              lineHeight: '120%',
              letterSpacing: '0%',
              fontWeight: '400', // 500 = 'medium'
            }],
            'detail': ['18px', {
              lineHeight: '120%',
              letterSpacing: '0%',
              fontWeight: '600', // semibold has weight 600 acording to tailwind docs
            }],
            'heading1': ['32px', {
              lineHeight: '120%',
              letterSpacing: '0%',
              fontWeight: '700', //
            }],
            'heading2': ['24px', {
              lineHeight: '120%',
              letterSpacing: '0%',
              fontWeight: '600', // 
            }],
            'heading3': ['16px', {
              lineHeight: '120%',
              letterSpacing: '0%',
              fontWeight: '600', 
            }],
            'body-heading': ['14px', {
              lineHeight: '120%',
              letterSpacing: '0%',
              fontWeight: '500', 
            }]
            ,
            'detail-regular': ['10px', {
              lineHeight: '120%',
              letterSpacing: '0%',
              fontWeight: '400', 
            }]
          },
          fontFamily: {
            sans: ["Poppins", "sans-serif"],
            serif: ["Poppins", "sans-serif"], // since there is no serif font defined
            mono: ["Roboto Mono", "monospace"],
          },
          boxShadow: {
            'invTR': '0 20px 0 0 #F7F7FB',
            'invBR': '0 -20px 0 0 #F7F7FB'
          }
        }
      }
    ]
  }),
  require('tailwind-scrollbar'),
  require('@butterfail/tailwindcss-inverted-radius'),
  ],
};
