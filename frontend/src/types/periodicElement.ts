export type PeriodicElementData = {
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

export class PeriodicElement implements PeriodicElementData {
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

  constructor(data: PeriodicElementData) {
    Object.assign(this, data);
  }
}

export class ElementFactory {
  static async loadElements(): Promise<PeriodicElement[]> {
    const FILE_PATH = "/periodic_table.json";
    const response = await fetch(FILE_PATH);
    
    if (!response.ok) {
      throw new Error(`Errore fetch periodicElement: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data.elements.map((elementData: PeriodicElementData) =>
      new PeriodicElement(elementData)
    );
  }
}
