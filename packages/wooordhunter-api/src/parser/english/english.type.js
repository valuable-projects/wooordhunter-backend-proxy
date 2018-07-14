// @flow

export type EnglishTranslation = {|
  language: 'english',
  transcription: {
    uk: string,
    us: string,
  },
  nouns: Array<string>,
  verbs: Array<string>,
  mainMeaning: string,
  phrases: Array<string>,
|}
