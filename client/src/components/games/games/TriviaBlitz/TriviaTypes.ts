export interface TriviaQuestion {
  id: string;
  question: string;
  choices: string[];
  answer: string;
}

export interface TriviaState {
  current: number;
  score: number;
  questions: TriviaQuestion[];
  complete: boolean;
}
