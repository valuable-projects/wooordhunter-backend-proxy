// @flow

import type { $Request, $Response } from 'express';

const router = require('express').Router();

const config = require('../../config');
const WooordhuntAPI = require('../wooordhunt/index');

const api: WooordhuntAPI = new WooordhuntAPI({ apiUri: config.PREFIX });

type GetTipsRequest = $Request & {
  params: { word: string },
};

router.get('/:word', async (req: GetTipsRequest, res: $Response): Promise<void> => {
  try {
    const { word } = req.params;

    const tips = await api.fetchTips(word);

    res.json(tips);
  } catch (error) {
    // Type annotation for catch parameters not supported yet (official notes)
    const err: Error = error;
    console.error(err);

    res.sendStatus(500);
  }
});

module.exports = router;
