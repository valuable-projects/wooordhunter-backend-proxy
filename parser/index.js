// @flow

import type { EnglishTranslation } from './english';
import type { RussianTranslation } from './russian';
import type { Word, Translation } from './index.type';

const getEnglishWordInfoFromHtml = require('./english').getWordInfoFromHtml;
const getRussianWordInfoFromHtml = require('./russian').getWordInfoFromHtml;

module.exports = (word: string, html: string): Translation => {
  const wordObject: Word = { word: word.toLocaleLowerCase() };

  if (/ru_content/.test(html)) {
    const translation: RussianTranslation = getRussianWordInfoFromHtml(html);

    return Object.assign({}, translation, wordObject);
  }

  const translation: EnglishTranslation = getEnglishWordInfoFromHtml(html);

  return Object.assign({}, translation, wordObject);
};
