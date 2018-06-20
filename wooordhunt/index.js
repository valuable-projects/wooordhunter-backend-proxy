// @flow

import type { Translation } from '../parser/index.type';
import type { Fetchable, Configurable, WooordhuntAPIOptions, Tip } from './index.type';

const got: Function = require('got');

const parse = require('../parser');

class WooordhuntAPI implements Fetchable, Configurable {
  static instance: WooordhuntAPI;

  options: WooordhuntAPIOptions;

  constructor(options: WooordhuntAPIOptions) {
    if (WooordhuntAPI.instance) {
      return WooordhuntAPI.instance;
    }

    this.options = options;
  }

  reconfigure(options: WooordhuntAPIOptions) {
    this.options = options;
  }

  async fetchWordTranslation(word: string): Promise<Translation> {
    const { apiUri } = this.options;

    const api = `${apiUri}//word/${word}`;

    const { body }: { body: string } = await got(api);

    const translation: Translation = parse(word, body);

    return translation;
  }

  async fetchTips(word: string) {
    const { apiUri } = this.options;

    const api = `${apiUri}/get_tips.php?abc=${word}`;
    const requestOptions = { json: true };

    const {
      body: { tips },
    }: {
      body: { tips: ?Array<Tip<string>> }
    } = await got(api, requestOptions);

    return tips || [];
  }
}

module.exports = WooordhuntAPI;
