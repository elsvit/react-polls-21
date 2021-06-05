export interface INewQuestion {
  question: string;
  choices: string[];
}

export const DEFAULT_NEW_QUESTION: INewQuestion = {
  question: '',
  choices: ['']
};

export interface IChoice {
  choice: string;
  url: string;
  votes: number;
}

export interface IQuestion {
  question: string;
  published_at: string;
  url: string;
  choices: IChoice[]
}