import type { PeriodicElement } from "../types/periodicElement";

const colorBackgroundMap: Record<string, string> = {
  "transition metal": "bg-element-transition-metal",
  "alkali metal": "bg-element-alkali-metal",
  "alkaline earth metal": "bg-element-alkaline-earth",
  "noble gas": "bg-element-noble-gas",
  "biogenic element": "bg-element-biogenic",
  "halogen": "bg-element-halogen",
  "semimetal": "bg-element-semimetal",
  "post-transition metal": "bg-element-post-transition-metal",
  "lanthanide": "bg-element-lanthanide",
  "actinide": "bg-element-actinide",
};

export function useElementCategory() {
  const getColorBackground = (element: PeriodicElement): string => {
    return colorBackgroundMap[element.colorGroup] || "bg-element-nonmetal";
  };

  return {
    getColorBackground,
    colorBackgroundMap,
  };
}
