export interface IId {
  id: number
}

export interface ILabelValue<V> {
  label: string;
  value: V
}

export enum SortType {
  DEFAULT = 'DEFAULT',
  ASC = 'ASC',
  DES = 'DES',
}