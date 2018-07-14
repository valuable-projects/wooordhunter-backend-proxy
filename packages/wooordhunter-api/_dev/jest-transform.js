/* eslint-disable import/no-extraneous-dependencies */

const flowRemoveTypes = require('flow-remove-types');

module.exports = {
  process(src) {
    return flowRemoveTypes(src).toString();
  },
};
