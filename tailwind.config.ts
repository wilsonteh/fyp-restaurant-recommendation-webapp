import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        light: "#f1f5f9",
        dark: "#0f172a",
      },
      fontFamily: {
        poppins: ['var(--font-poppins)']
      },
      screens: {
        xs: "420px",
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {
            hoverOpacity: 0.8
          },
          colors: {
            background: "#f1f5f9",    // slate-100
            foreground: "#0f172a",    // slate-900
            primary: {
              100: "#FBFFCF",
              200: "#F6FF9F",
              300: "#F0FF6F",
              400: "#EAFF4B",
              500: "#E1FF0F",
              600: "#BEDB0A",
              700: "#9CB707",
              800: "#7C9304",
              900: "#657A02",
              foreground: "#202228",
              DEFAULT: "#BEDB0A",
            }, 
            secondary: {
              100: "#E9FAF8",
              200: "#D4F6F5",
              300: "#B6E4E5",
              400: "#97C6CC",
              500: "#70A0AB",
              600: "#518293",
              700: "#38647B",
              800: "#234963",
              900: "#153452",
              foreground: "#EEF2F4",
              DEFAULT: "#518293",
            }, 
            success: {
              100: "#F3FDD4",
              200: "#E5FBAA",
              300: "#D0F47D",
              400: "#B9EA5C",
              500: "#98DD2A",
              600: "#7ABE1E",
              700: "#5F9F15",
              800: "#46800D",
              900: "#346A08",
              foreground: "#202228",
              DEFAULT: "#98DD2A",
            },
            warning: {
              100: "#FFFBCF",
              200: "#FFF69F",
              300: "#FFEF70",
              400: "#FFE94C",
              500: "#FFDF11",
              600: "#DBBC0C",
              700: "#B79B08",
              800: "#937A05",
              900: "#7A6303",
              foreground: "#202228",
              DEFAULT: "#FFDF11",
            },
            danger: {
              100: "#FFE2D7",
              200: "#FFBEB0",
              300: "#FF9488",
              400: "#FF6B6B",
              500: "#FF3A4B",
              600: "#DB2A49",
              700: "#B71D46",
              800: "#931240",
              900: "#7A0B3D",
              foreground: "#EEF2F4",
              DEFAULT: "#FF3A4B",
            }
          }, 
        },
        dark: {
          layout: {
            hoverOpacity: 0.8
          },
          colors: {
            background: "#0f172a",
            foreground: "#f1f5f9",
            content1: '#1e293b',
            content2: '#1e293b',
            content3: '#1e293b',
            content4: '#1e293b',
            overlay: '#334155',
            divider: "red",
            primary: {
              100: "#FBFFCF",
              200: "#F6FF9F",
              300: "#F0FF6F",
              400: "#EAFF4B",
              500: "#E1FF0F",
              600: "#BEDB0A",
              700: "#9CB707",
              800: "#7C9304",
              900: "#657A02",
              foreground: "#202228",
              DEFAULT: "#E1FF0F",
            }, 
            secondary: {
              100: "#E9FAF8",
              200: "#D4F6F5",
              300: "#B6E4E5",
              400: "#97C6CC",
              500: "#70A0AB",
              600: "#518293",
              700: "#38647B",
              800: "#234963",
              900: "#153452",
              foreground: "#EEF2F4",
              DEFAULT: "#70A0AB",
            }, 
            success: {
              100: "#F3FDD4",
              200: "#E5FBAA",
              300: "#D0F47D",
              400: "#B9EA5C",
              500: "#98DD2A",
              600: "#7ABE1E",
              700: "#5F9F15",
              800: "#46800D",
              900: "#346A08",
              foreground: "#202228",
              DEFAULT: "#98DD2A",
            },
            warning: {
              100: "#FFFBCF",
              200: "#FFF69F",
              300: "#FFEF70",
              400: "#FFE94C",
              500: "#FFDF11",
              600: "#DBBC0C",
              700: "#B79B08",
              800: "#937A05",
              900: "#7A6303",
              foreground: "#202228",
              DEFAULT: "#FFDF11",
            },
            danger: {
              100: "#FFE2D7",
              200: "#FFBEB0",
              300: "#FF9488",
              400: "#FF6B6B",
              500: "#FF3A4B",
              600: "#DB2A49",
              700: "#B71D46",
              800: "#931240",
              900: "#7A0B3D",
              foreground: "#EEF2F4",
              DEFAULT: "#FF3A4B",
            }
          }, 
        }
      }, 
    }),
  ]
}

export default config;
