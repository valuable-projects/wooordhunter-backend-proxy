// @flow

import type { $Request, $Response } from 'express';

const router = require('express').Router();
const { models } = require('../database');

const { Registration } = models;

export type Identifier = {
  uuid: string,
};

router.get('/', async (req: $Request, res: $Response) => {
  try {
    const registrations = await Registration.findAll({ limit: 10, offset: 0 });

    res.status(200).json(registrations);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
});

router.post('/', async (req: { body: Identifier }, res: $Response) => {
  try {
    const { uuid } = req.body;

    await Registration.upsertById(uuid);

    res.sendStatus(201);
  } catch (error) {
    console.log('error', error);
    res.status(500).send(error);
  }
});

module.exports = router;
