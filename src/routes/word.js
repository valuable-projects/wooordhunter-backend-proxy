// @flow

import type { $Request, $Response } from 'express';

const router = require('express').Router();

const config = require('../../config');
const WooordhuntAPI = require('../wooordhunt/index');

const api: WooordhuntAPI = new WooordhuntAPI({ apiUri: config.PREFIX });

type GetTranslationRequest = $Request & {
  params: { word: string },
};

router.get('/:word', async (req: GetTranslationRequest, res: $Response): Promise<void> => {
  try {
    const { word } = req.params;

    const data = await api.fetchWordTranslation(word);

    res.json(data);
  } catch (error) {
    // Type annotation for catch parameters not supported yet (official notes)
    const err: Error = error;
    console.error(err);

    res.sendStatus(500);
  }
});

module.exports = router;
