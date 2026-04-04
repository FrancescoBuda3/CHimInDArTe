/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "Montserrat",
      },
      backgroundImage: {
        "element-nonmetal": "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
        "element-noble-gas": "linear-gradient(135deg, #4ECDC4 0%, #45B7AA 100%)",
        "element-alkali-metal": "linear-gradient(135deg, #FFD93D 0%, #FFC93D 100%)",
        "element-alkaline-earth": "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
        "element-transition-metal": "linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)",
        "element-lanthanide": "linear-gradient(135deg, #F472B6 0%, #EC4899 100%)",
        "element-actinide": "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
        "element-semimetal": "linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
        "element-diatomic-nonmetal": "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
        "element-polyatomic-nonmetal": "linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%)",
        "element-halogen": "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
      },
    },
  },
};
