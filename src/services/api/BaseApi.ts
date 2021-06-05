import {stringify} from 'query-string';

import {API_PATH} from '~/constants/config';
import {QuestionsResponseTypes} from './QuestionsApi';

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type ResponseTypes = QuestionsResponseTypes;

interface IFetchResult {
  url: string;
  method: ApiMethod;
  // eslint-disable-next-line
  value?: any;
  // eslint-disable-next-line
  headers?: any;
}

interface IFetchOptions {
  method: ApiMethod;
  credentials?: string;
  headers?: IStringDict;
  body?: string | FormData;
}

export default class BaseApi {
  public baseApiURL: string;

  constructor(baseURL = '') {
    this.baseApiURL = `${baseURL}${API_PATH}`;
  }

  // eslint-disable-next-line
  private request = (url: string, options: any): Promise<ResponseTypes> =>
    new Promise((resolve, reject) =>
      fetch(url, options)
        .then(res => res.json())
        .then(res => {
          if (res) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          console.error(err);
          reject({
            success: false,
            error: err
          });
        }),
    );

  public handleFetch = ({url, method, value = null}: IFetchResult): Promise<ResponseTypes> => {
    let queryPath = `${this.baseApiURL}${url}`;
    const options: IFetchOptions = {method};

    if (value !== null) {
      if (method === ApiMethod.GET) {
        queryPath += `?${stringify(value)}`;
      } else {
        options.body = JSON.stringify(value);
      }
    }

    return this.request(queryPath, options);
  };

  public get = (url: string, value?: Record<string, string>): Promise<ResponseTypes> =>
    this.handleFetch({
      url,
      method: ApiMethod.GET,
      value
    });

  public post = <T>(url: string, value?: T): Promise<ResponseTypes> =>
  // public post = (url: string, value?: Record<string, string>): Promise<ResponseTypes> =>
    this.handleFetch({
      url,
      method: ApiMethod.POST,
      value
    });
}