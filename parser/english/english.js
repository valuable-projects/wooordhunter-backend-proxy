// @flow

import type { EnglishTranslation } from './english.type';

const cherio = require('cherio');

const languages = require('../languages');

const preprocessDomModel = (content: any): void => {
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

const getAllMeanings = (content: any, marker: mixed): Array<string> => {
  const node = content.find(marker).next();

  node.find('#pos_noun').removeClass('hidden');
  node.find('.hidden').remove();
  node.find('.more').remove();

  return node
    .text()
    .split('-')
    .map((v: string): string => v.trim())
    .filter((v: string): boolean => !!v);
};

const getPhrases = (content: any): Array<string> => {
  content.find('.snoska').remove();

  return content
    .find('.block.phrases')
    .text()
    .split('  ')
    .map((v: string): string => v.trim())
    .filter((v: string): boolean => !!v);
};

const getUKTranscription = (content: any): string =>
  content
    .find('#uk_tr_sound')
    .find('span')
    .text()
    .trim();

const getUSTranscription = (content: any): string =>
  content
    .find('#us_tr_sound')
    .find('span')
    .text()
    .trim();

const getWordInfoFromHtml = (html: string): EnglishTranslation => {
  const content = cherio.load(html)('#wd');

  preprocessDomModel(content);

  const foundItems = content.find('.pos_item');
  const noun = foundItems[0];
  const verb = foundItems[1];

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
