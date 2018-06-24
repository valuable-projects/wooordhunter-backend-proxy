// @flow

import type { EnglishTranslation } from './english.type';
import type { CherioEntryPoint, CherioObject } from '../index.type';

const cherio: CherioEntryPoint = require('cherio');

const languages = require('../languages');

const preprocessDomModel = (content: CherioObject): void => {
  content.find('#word_action_block').remove();
  content.find('#word_action_block_help').remove();
  content.find('img').remove();
  content.find('audio').remove();
  content.find('span.sound_pic').remove();
  content
    .find('#wd_title')
    .find('h1')
    .remove();
};

const getAllMeanings = (content: CherioObject, marker: CherioObject): Array<string> => {
  const node = (content.find(marker): CherioObject).next();

  node.find('#pos_noun').removeClass('hidden');
  node.find('.hidden').remove();
  node.find('.more').remove();

  return node
    .text()
    .split('-')
    .map((v: string): string => v.trim())
    .filter((v: string): boolean => !!v);
};

const getPhrases = (content: CherioObject): Array<string> => {
  content.find('.snoska').remove();

  return content
    .find('.block.phrases')
    .text()
    .split('  ')
    .map((v: string): string => v.trim())
    .filter((v: string): boolean => !!v);
};

const getUKTranscription = (content: CherioObject): string =>
  content
    .find('#uk_tr_sound')
    .find('span')
    .text()
    .trim();

const getUSTranscription = (content: CherioObject): string =>
  content
    .find('#us_tr_sound')
    .find('span')
    .text()
    .trim();

const getWordInfoFromHtml = (html: string): EnglishTranslation => {
  const content: CherioObject = cherio.load(html)('#wd');

  preprocessDomModel(content);

  const foundItems = content.find('.pos_item');
  const noun: CherioObject = foundItems[0];
  const verb: CherioObject = foundItems[1];

  const data: EnglishTranslation = {
    transcription: {
      uk: getUKTranscription(content),
      us: getUSTranscription(content),
    },
    nouns: getAllMeanings(content, noun),
    verbs: getAllMeanings(content, verb),
    mainMeaning: content.find('.t_inline_en').text(),
    phrases: getPhrases(content),
    language: languages.english,
  };

  return data;
};

module.exports = {
  getAllMeanings,
  getPhrases,
  getUKTranscription,
  getUSTranscription,
  getWordInfoFromHtml,
  preprocessDomModel,
};
