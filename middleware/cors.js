// @flow

import type { $Request, $Response, NextFunction } from 'express';

const cors = (req: $Request, res: $Response, next: NextFunction): mixed => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  return next();
};

module.exports = { cors };
