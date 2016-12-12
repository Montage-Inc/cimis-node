require('es6-promise').polyfill();
require('fetch-everywhere');

const R = require('ramda');

const Stations = require('./resources/Stations');

const basePath = "http://et.water.ca.gov/api";

const dataFetcher = R.curry((appKey, path, options) => {
  const params = R.merge({ appKey }, options);
  return fetch(`${basePath}/${path}?${toQuery(params)}`, {
    method: 'GET',
    headers: {
      "User-Agent": "Cimis Node v1.0",
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
  })
  .then(response => response.json());
});

const toQuery = params => R.keys(params).map(key => `${key}=${params[key]}`).join('&');

const Cimis = appKey => {
  if (!appKey) { throw new Error("App key is required") }

  return {
    stations: Stations(dataFetcher(appKey))
  };
}

module.exports = {
  default: Cimis,
  toQuery,
  dataFetcher
};
