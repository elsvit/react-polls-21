import {IQuestion, IChoice, INewQuestion} from '~/types/IQuestions';
import BaseApi from './BaseApi';

export default class QuestionsApi {
  constructor(baseApi: BaseApi) {
    this.baseApi = baseApi;
  }

  public baseApi: BaseApi;

  public getQuestions = (): Promise<IQuestion[]> => this.baseApi.get('/questions');

  public getQuestion = (id: string): Promise<IQuestion> => this.baseApi.get(`/questions/${id}`);

  public saveVote = (value: IChoice): Promise<void> => this.baseApi.post(value.url, value); // e.g. value.url = "/questions/1/choices/1"

  public addQuestion = (value: INewQuestion): Promise<IQuestion> => this.baseApi.post('/questions', value);
}

export type QuestionsResponseTypes = IQuestion[] & IQuestion & void