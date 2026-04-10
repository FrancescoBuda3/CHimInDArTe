import type { PeriodicElement } from "../types/periodicElement";

const categoryMap: Record<string, string> = {
  "diatomic nonmetal": "bg-element-diatomic-nonmetal",
  "polyatomic nonmetal": "bg-element-polyatomic-nonmetal",
  "noble gas": "bg-element-noble-gas",
  "alkali metal": "bg-element-alkali-metal",
  "alkaline earth metal": "bg-element-alkaline-earth",
  "transition metal": "bg-element-transition-metal",
  lanthanide: "bg-element-lanthanide",
  actinide: "bg-element-actinide",
  semimetal: "bg-element-semimetal",
  halogen: "bg-element-halogen",
};

export function useElementCategory() {
  const getCategoryClass = (element: PeriodicElement): string => {
    return categoryMap[element.category] || "bg-element-nonmetal";
  };

  return {
    getCategoryClass,
    categoryMap,
  };
}
