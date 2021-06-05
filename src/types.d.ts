declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';

type Maybe<T> = T | null | undefined;
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

interface IStringDict {
  [key: string]: string
}

interface IBoolDict {
  [key: string]: Maybe<boolean>
}

interface IObjectDict<T> {
  [key: string]: Maybe<T>
}