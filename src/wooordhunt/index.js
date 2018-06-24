// @flow
/* eslint-disable class-methods-use-this */

import type { Translation } from '../parser/index.type';
import type { Fetchable, Configurable, WooordhuntAPIOptions, Tip, RawTip } from './index.type';

const got: (string, options?: { json?: boolean }) => Promise<Object> = require('got');

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

    const api = `${apiUri}/word/${word}`;

    const { body }: { body: string } = await got(api);

    const translation: Translation = parse(word, body);

    return translation;
  }

  handleRawTips(response: { body: { tips: ?Array<RawTip<string>> } }): Array<Tip<string>> {
    const tips: Array<RawTip<string>> = response.body.tips || [];

    return tips.map(tip => ({ word: tip.w, translation: tip.t }));
  }

  async fetchTips(word: string) {
    const { apiUri } = this.options;

    const api = `${apiUri}/get_tips.php?abc=${word}`;
    const requestOptions = { json: true };
    const tips: Array<Tip<string>> = await got(api, requestOptions).then(this.handleRawTips);

    return tips;
  }
}

module.exports = WooordhuntAPI;
