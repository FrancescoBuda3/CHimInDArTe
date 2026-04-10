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
      uScale: {
        xs: "0.10",
        sm: "0.20",
        md: "0.40",
        lg: "0.60",
        xl: "0.80",
        icon: "0.40",
        btn: "0.60",
        tile: "1", // 1u esatto → dimensione cella tavola periodica
        "2x": "2", // utilità a moltiplicatori interi se servono
        "3x": "3",
        "4x": "4",
        "5x": "5",
        "6x": "6",
        "7x": "7",
      },
      backgroundImage: {
        "element-nonmetal": "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
        "element-noble-gas":
          "linear-gradient(135deg, #4ECDC4 0%, #45B7AA 100%)",
        "element-alkali-metal":
          "linear-gradient(135deg, #FFD93D 0%, #FFC93D 100%)",
        "element-alkaline-earth":
          "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
        "element-transition-metal":
          "linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)",
        "element-lanthanide":
          "linear-gradient(135deg, #F472B6 0%, #EC4899 100%)",
        "element-actinide": "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
        "element-semimetal":
          "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
        "element-diatomic-nonmetal":
          "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
        "element-polyatomic-nonmetal":
          "linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%)",
        "element-halogen": "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
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
