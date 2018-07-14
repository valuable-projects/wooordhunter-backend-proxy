// @flow

import type { RussianTranslation as Translation } from './russian.type';

const { getPhrases, getCommonMeanging, getWordInfoFromHtml } = require('./russian');

export type RussianTranslation = Translation;

module.exports = { getPhrases, getCommonMeanging, getWordInfoFromHtml };
