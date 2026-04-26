/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    extend: {
      fontFamily: {
        montserrat: "Montserrat",
      },
      backgroundColor: {
        "zone-1": "#ECC200",
        "zone-2": "#76C3B1",
        "zone-3": "#3382D1",
        "zone-4": "#23B5B5",
      },
      uScale: {
        xs: "0.10",
        sm: "0.20",
        md: "0.40",
        lg: "0.60",
        xl: "0.80",
        icon: "0.40",
        btn: "0.60",
        gameTile: "0.80",
        tile: "1",
        "2x": "2",
        "3x": "3",
        "4x": "4",
        "5x": "5",
        "6x": "6",
        "7x": "7",
      },
      backgroundImage: {
        "element-nonmetal": "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
        "element-alkali-metal": "linear-gradient(135deg, #EE7203 0%, #F59640 100%)",
        "element-alkaline-earth": "linear-gradient(135deg, #ECC200 0%, #ECD047 100%)",
        "element-noble-gas": "linear-gradient(135deg, #EA4E64 0%, #F07A8C 100%)",
        "element-biogenic": "linear-gradient(135deg, #6250AD 0%, #8274C4 100%)",
        "element-halogen": "linear-gradient(135deg, #C06088 0%, #D485A4 100%)",
        "element-semimetal": "linear-gradient(135deg, #3382D1 0%, #60A2DF 100%)",
        "element-transition-metal": "linear-gradient(135deg, #76C3B1 0%, #9AD3C8 100%)",
        "element-post-transition-metal": "linear-gradient(135deg, #3EB4E8 0%, #72CAF0 100%)",
        "element-lanthanide": "linear-gradient(135deg, #71BE95 0%, #95D0AE 100%)",
        "element-actinide": "linear-gradient(135deg, #23B5B5 0%, #52C8C8 100%)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      const scale = theme("uScale");

      matchUtilities(
        {
          "u-size": (v) => ({
            width: `calc(var(--u) * ${v})`,
            height: `calc(var(--u) * ${v})`,
          }),
        },
        { values: scale },
      );
      matchUtilities(
        { "u-w": (v) => ({ width: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-h": (v) => ({ height: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        {
          "u-text": (v) => ({
            fontSize: `clamp(0.4rem, calc(var(--u) * ${v}), 4rem)`,
          }),
        },
        { values: scale },
      );
      matchUtilities(
        { "u-p": (v) => ({ padding: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-px": (v) => ({ paddingInline: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-py": (v) => ({ paddingBlock: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-pt": (v) => ({ paddingTop: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-pb": (v) => ({ paddingBottom: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-pstart": (v) => ({ paddingInlineStart: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-m": (v) => ({ margin: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-mx": (v) => ({ marginInline: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-my": (v) => ({ marginBlock: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-gap": (v) => ({ gap: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-gap-x": (v) => ({ columnGap: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-gap-y": (v) => ({ rowGap: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
      matchUtilities(
        { "u-rounded": (v) => ({ borderRadius: `calc(var(--u) * ${v})` }) },
        { values: scale },
      );
    }),
  ],
};
