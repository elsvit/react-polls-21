import BaseApi from './BaseApi';
import QuestionsApi from './QuestionsApi';

export interface IApiServices {
  baseApi: BaseApi,
  questionsApi: QuestionsApi,
}

export function initApiServices(baseUrl?: string): IApiServices {
  const baseApi = new BaseApi(baseUrl);
  const questionsApi = new QuestionsApi(baseApi);

  return {
    baseApi,
    questionsApi
  };
}