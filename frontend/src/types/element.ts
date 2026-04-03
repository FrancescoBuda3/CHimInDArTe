export type ElementData = {
  name: string;
  atomic_mass: number;
  category: string;
  density: number;
  discovered_by: string;
  molar_heat: number | null;
  melt: number;
  named_by: string | null;
  number: number;
  period: number;
  group: number;
  phase: string;
  symbol: string;
  xpos: number;
  ypos: number;
  block: string;
  electron_affinity: number;
  electronegativity_pauling: number | null;
};

export class Element implements ElementData {
  name!: string;
  atomic_mass!: number;
  category!: string;
  density!: number;
  discovered_by!: string;
  molar_heat!: number | null;
  melt!: number;
  named_by!: string | null;
  number!: number;
  period!: number;
  group!: number;
  phase!: string;
  symbol!: string;
  xpos!: number;
  ypos!: number;
  block!: string;
  electron_affinity!: number;
  electronegativity_pauling!: number | null;

  constructor(data: ElementData) {
    Object.assign(this, data);
  }
}

export class ElementFactory {
  static async loadElements(): Promise<Element[]> {
    const FILE_PATH = "/CHimInDArTe/periodic_table.json";
    const response = await fetch(FILE_PATH);
    const data = await response.json();
    
    return data.elements.map((elementData: ElementData) =>
      new Element(elementData)
    );
  }
}
