export type WorkData = {
    id: string;
    title: string;
    alternativeTitle: string;
    author: string;
    description: string;
    materials: [string];
};

export class Work implements WorkData {
    id!: string;
    title!: string;
    alternativeTitle!: string;
    author!: string;
    description!: string;
    materials!: [string];
  

  constructor(data: WorkData) {
    Object.assign(this, data);
  }
}

export class WorkFactory {
  static async loadElements(): Promise<Work[]> {
    const FILE_PATH = "/works.json";
    const response = await fetch(FILE_PATH);
    
    if (!response.ok) {
      throw new Error(`Errore fetch works: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    return data.works.map((workData: WorkData) =>
      new Work(workData)
    );
  }
}