/* @flow */

require('es6-promise').polyfill();
require('fetch-everywhere');

// Utilities
import { dataFetcher } from './Utils';

// Resources
import { Stations } from './resources';

const Cimis = (appKey: string): CimisAPI => {
  if (!appKey) { throw new Error("App key is required") }

  return {
    stations: Stations(dataFetcher(appKey))
  };
}

export default Cimis;
