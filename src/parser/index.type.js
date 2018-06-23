// @flow

import type { EnglishTranslation } from './english';
import type { RussianTranslation } from './russian';

export type Word = { word: string };
export type FullEnglishTranslation = {|
  ...EnglishTranslation,
  ...$Exact<Word>,
|};
export type FullRussianTranslation = {|
  ...RussianTranslation,
  ...$Exact<Word>,
|};
export type Translation = FullEnglishTranslation | FullRussianTranslation;
