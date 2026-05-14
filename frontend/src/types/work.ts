export type WorkData = {
    id: number;
    title: string;
    alternative_title: string;
    author: string;
    description_file: string;
    materials: [string];
    picture_file: string;
    model_file: string;
    has_model: boolean;
};

export class Work implements WorkData {
    id!: number;
    title!: string;
    alternative_title!: string;
    author!: string;
    description_file!: string;
    materials!: [string];
    picture_file!: string;
    model_file!: string;
    has_model!: boolean;
  

  constructor(data: WorkData) {
    Object.assign(this, data);
  }
}

export class WorkFactory {
  static async loadElements(): Promise<Work[]> {
    const FILE_PATH = `${import.meta.env.BASE_URL}works.json`;
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