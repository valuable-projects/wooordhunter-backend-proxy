// @flow

import type { RussianTranslation } from './russian.type';
import type { CherioEntryPoint, CherioObject } from '../index.type';

const cherio: CherioEntryPoint = require('cherio');

const languages = require('../languages');

const getPhrasesFromDiv = (div: CherioObject): Array<string> =>
  div
    .html()
    .replace(/<br>/g, '\n')
    .replace(/<br\/>/g, '\n')
    .split('\n')
    .map((line: string): string => line.trim())
    .filter((line: string): boolean => !!line)
    .map((line: string): string => line.replace(/<span>/g, '').replace(/<\/span>/g, ''));

const getPhrases = (content: CherioObject): Array<string> => {
  content.find('.more_up').remove();
  content.find('.more_ru').remove();
  content.find('.more_down').remove();

  const div = content.find('.word_ex');

  const hiddenPhrases: Array<string> = getPhrasesFromDiv(div.find('.hidden'));

  content.find('.hidden').remove();

  const visiblePhrases: Array<string> = getPhrasesFromDiv(div);

  return [...visiblePhrases, ...hiddenPhrases];
};

const getCommonMeanging = (content: CherioObject): Array<string> => {
  const divWithWord: CherioObject = content.find('#wd_content');
  divWithWord.find('.word_ex').remove();

  const rawValues: Array<string> = [];
  const meanings: Array<string> = [];

  let hasGap: boolean = false;

  function processChild(): void {
    const hasGapNow: boolean = cherio(this).hasClass('gap');
    hasGap = hasGap || hasGapNow;

    const string: string = cherio(this).text();

    if (hasGap || !string) return;

    rawValues.push(string);
  }

  divWithWord.children().each(processChild);

  for (let i = 0; i < rawValues.length; i += 2) {
    const string: string = `${rawValues[i]} - ${rawValues[i + 1]}`;

    meanings.push(string);
  }

  return meanings;
};

const getWordInfoFromHtml = (html: string): RussianTranslation => {
  const content: CherioObject = cherio.load(html, { decodeEntities: false })('#wd');

  const data: RussianTranslation = {
    transcription: {
      uk: '',
      us: '',
    },
    nouns: [],
    verbs: [],
    mainMeaning: '',
    phrases: getPhrases(content),
    commonMeanings: getCommonMeanging(content),
    language: languages.russian,
  };

  return data;
};

module.exports = { getPhrases, getCommonMeanging, getWordInfoFromHtml };
