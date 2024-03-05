/* eslint-env node */
import daisyui from "daisyui";
import defaultTheme from "tailwindcss/defaultTheme";

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  safelist: [
    'bg-status-waiting',
    'bg-status-starting',
    'bg-status-not-ready',
    'bg-status-ready',
    'bg-status-terminated-ok',
    'bg-status-terminated-ko',
    'bg-status-unknown',
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    asideScrollbars: {
      light: "light",
      gray: "gray",
    },
    extend: {
      zIndex: {
        "-1": "-1",
      },
      flexGrow: {
        5: "5",
      },
      maxHeight: {
        "screen-menu": "calc(100vh - 3.5rem)",
        modal: "calc(100vh - 160px)",
      },
      transitionProperty: {
        position: "right, left, top, bottom, margin, padding",
        textColor: "color",
        height: "height",
      },
      keyframes: {
        "fade-out": {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        "fade-out": "fade-out 250ms ease-in-out",
        "fade-in": "fade-in 250ms ease-in-out",
      },
      colors: {
        "status-waiting": "#ccc",
        "status-starting": "rgb(149, 251, 149)",
        "status-not-ready": "rgb(253, 224, 71)",
        "status-ready": "rgb(34, 197, 94)",
        "status-terminated-ok": "#a1dea1",
        "status-terminated-ko": "#e36561",
        "status-unknown": "#fff",
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      opacity: ['disabled'],
      text: ['disabled'],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "aside-scrollbars": (value) => {
            const track = value === "light" ? "100" : "900";
            const thumb = value === "light" ? "300" : "600";
            const color = value === "light" ? "gray" : value;

            return {
              scrollbarWidth: "thin",
              scrollbarColor: `${theme(`colors.${color}.${thumb}`)} ${theme(
                `colors.${color}.${track}`
              )}`,
              "&::-webkit-scrollbar": {
                width: "8px",
                height: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: theme(`colors.${color}.${track}`),
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "0.25rem",
                backgroundColor: theme(`colors.${color}.${thumb}`),
              },
            };
          },
        },
        { values: theme("asideScrollbars") }
      );
    }),
    daisyui,],
    daisyui: {
      themes: [
          {
            cmyk: {
              ...require("daisyui/src/theming/themes")["[data-theme=cmyk]"],
              "base-200": "rgb(250, 250, 249)",
              "base-300": "rgb(245, 245, 244)",
            },
          },
        ],
      rtl: false,
    },
};
