// @flow
/* eslint-disable no-use-before-define */

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

export type CherioObject = {|
  children(): ArrayOfCherioObjects,
  find(string | CherioObject): ArrayOfCherioObjects & CherioObject,
  hasClass(string): boolean,
  html(): string,
  next(): CherioObject,
  remove(): void,
  removeClass(string): void,
  text(): string,
|};

export type ArrayOfCherioObjects = CherioObject[] & { each(cb: () => void): void, }

export type CherioEntryPoint = {
  load: (string, options?: { decodeEntities?: boolean }) => ((string) => CherioObject),
  $call(context: Object): CherioObject,
};
