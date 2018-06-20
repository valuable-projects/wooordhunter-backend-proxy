// @flow

import type { EnglishTranslation as Translation } from './english.type';

const {
  getAllMeanings,
  getPhrases,
  getUKTranscription,
  getUSTranscription,
  getWordInfoFromHtml,
  preprocessDomModel,
} = require('./english');

export type EnglishTranslation = Translation;

module.exports = {
  getAllMeanings,
  getPhrases,
  getUKTranscription,
  getUSTranscription,
  getWordInfoFromHtml,
  preprocessDomModel,
};
