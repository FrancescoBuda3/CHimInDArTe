import type { Work } from "./work";

export type ClassicQuestionData = {
  question: string;
  options: Record<number, string>;
  answer: number;
  curiosity: string;
};

export interface Question {
  tryAnswer(answer: number): boolean;
}

export class ClassicQuestion implements ClassicQuestionData, Question {
  question!: string;
  options!: Record<number, string>;
  answer!: number;
  curiosity!: string;

  constructor(data: ClassicQuestionData) {
    Object.assign(this, data);
  }

  tryAnswer(answer: number): boolean {
    return this.answer === answer;
  }
}

export class WorkMemoryQuestion implements Question {
  options!: Record<number, Work>;
  answer!: number;

  tryAnswer(answer: number): boolean {
    return this.answer === answer;
  }
}

export type ElementQuestionsData = {
  element_id: number;
  game_order: number;
  game_zone: number;
  questions: ClassicQuestionData[];
};

export class ElementQuestions implements ElementQuestionsData {
  element_id!: number;
  game_order!: number;
  game_zone!: number;
  questions!: ClassicQuestion[];

  constructor(data: ElementQuestionsData) {
    this.element_id = data.element_id;
    this.game_order = data.game_order;
    this.game_zone = data.game_zone;
    this.questions = data.questions.map((q) => new ClassicQuestion(q));
  }
}

export class ElementQuestionsFactory {
  static async loadElementQuestions(): Promise<ElementQuestions[]> {
    const FILE_PATH = `${import.meta.env.BASE_URL}quizzes.json`;
    const response = await fetch(FILE_PATH);
    const data = await response.json();
    return data.map(
      (elementData: ElementQuestionsData) => new ElementQuestions(elementData),
    );
  }
}
