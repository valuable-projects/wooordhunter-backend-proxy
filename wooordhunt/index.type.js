// @flow

import type { Translation } from '../parser/index.type';

export type Tip<T> = {
  word: T,
  translation: T,
}

export type WooordhuntAPIOptions = {
  apiUri: string,
}

export interface Fetchable {
  fetchWordTranslation(word: string): Promise<Translation>,
  fetchTips(word: string): Promise<Array<Tip<string>>>,
}

export interface Configurable {
  reconfigure(options: WooordhuntAPIOptions): void,
}
