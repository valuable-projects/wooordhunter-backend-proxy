// @flow

import type { $Request, $Response } from 'express';

const router = require('express').Router();

const cache: { [string]: Date } = {};

type Identifier = {
  uuid: string,
}

router.get('/', (req: $Request, res: $Response): void => {
  const values: Array<string> = (Object.values(cache): Array<any>);

  res.status(200).json(values);
});

router.post('/', (req: { body: Identifier }, res: $Response): void => {
  const { body } = req;

  cache[body.uuid] = new Date();

  res.sendStatus(201);
});

module.exports = router;
