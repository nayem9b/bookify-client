/** @type {import('tailwindcss').Config} */

// Brand scales. Older pages use Tailwind's indigo/purple/blue/pink/gray
// classes directly; mapping those names onto the brand scales keeps every
// page on one palette until each page is restyled with the named tokens.
const clothScale = {
  50: "#EEF3F0",
  100: "#DCE7E1",
  200: "#B9CFC3",
  300: "#8FB1A1",
  400: "#5F8C7A",
  500: "#3F7262",
  600: "#2F5D50",
  700: "#244A40",
  800: "#1C3A32",
  900: "#142A25",
  950: "#0C1A17",
};
const stampScale = {
  50: "#EFF1FA",
  100: "#DDE1F3",
  200: "#BCC4E8",
  300: "#929DD7",
  400: "#6474C2",
  500: "#4656AF",
  600: "#3646A0",
  700: "#2C3A86",
  800: "#232F6B",
  900: "#1B2452",
  950: "#111735",
};
const oxbloodScale = {
  50: "#F8EDEC",
  100: "#F0D8D6",
  200: "#E0B1AD",
  300: "#CB8580",
  400: "#B05B55",
  500: "#95413B",
  600: "#7A2E2E",
  700: "#642525",
  800: "#4E1D1D",
  900: "#3A1616",
  950: "#240D0D",
};
const inkScale = {
  50: "#F4F5F0",
  100: "#ECEEE6",
  200: "#DCE0D5",
  300: "#C9CEC1",
  400: "#9BA39C",
  500: "#7B8582",
  600: "#5C6764",
  700: "#4A5654",
  800: "#2E3B39",
  900: "#1E2A28",
  950: "#141D1B",
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Literata", "Georgia", "serif"],
        spine: ['"Big Shoulders Display"', "Impact", "sans-serif"],
      },
      colors: {
        indigo: clothScale,
        purple: clothScale,
        violet: clothScale,
        blue: stampScale,
        sky: stampScale,
        cyan: stampScale,
        pink: oxbloodScale,
        gray: inkScale,
        slate: inkScale,
        // Secondhand-bookshop palette: pulp paper, bookcloth, date-stamp ink.
        paper: { DEFAULT: "#ECEEE6", deep: "#E1E4D9" },
        ink: { DEFAULT: "#1E2A28", soft: "#4A5654", faint: "#7B8582" },
        cloth: { DEFAULT: "#2F5D50", dark: "#244A40" },
        stamp: "#3646A0",
        rule: "#C9CEC1",
        spine: {
          oxblood: "#7A2E2E",
          ochre: "#B9862E",
          navy: "#2B3A5C",
          green: "#2F5D50",
          slate: "#5E6A70",
          plum: "#5A3D55",
        },
      },
      keyframes: {
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "scroll-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "scroll-left": "scroll-left 50s linear infinite",
        "scroll-right": "scroll-right 50s linear infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2F5D50",
          "primary-content": "#ECEEE6",
          secondary: "#3646A0",
          accent: "#B9862E",
          neutral: "#1E2A28",
          "base-100": "#ECEEE6",
          "base-200": "#E1E4D9",
          "base-300": "#C9CEC1",
          "base-content": "#1E2A28",
          info: "#3646A0",
          success: "#2F7A55",
          warning: "#B9862E",
          error: "#A23B2E",
          "--rounded-box": "0.375rem",
          "--rounded-btn": "0.25rem",
          "--rounded-badge": "0.25rem",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
