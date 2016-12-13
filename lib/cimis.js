/* @flow */

require('es6-promise').polyfill();
require('fetch-everywhere');

// Utilities
const dataFetcher = require('./utils').dataFetcher;

// Resources
const Stations = require('./resources/Stations');

const Cimis = (appKey: string): CimisAPI => {
  if (!appKey) { throw new Error("App key is required") }

  return {
    stations: Stations.default(dataFetcher(appKey))
  };
}

module.exports = {
  default: Cimis
};
