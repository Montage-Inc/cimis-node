/* @flow */

const R = require('ramda');

// Constants
const BASE_PATH = "http://et.water.ca.gov/api";

const dataFetcher = R.curry((
  appKey: string,
  path: string,
  options: Object
): Promise<any> => {
  const params = R.merge({ appKey }, options);
  return fetch(`${BASE_PATH}/${path}?${toQuery(params)}`, {
    method: 'GET',
    headers: {
      "User-Agent": "Cimis Node v1.0",
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
  })
  .then(response => response.json());
});

const toQuery = (params: Object): string =>
  R.keys(params).map(key => `${key}=${params[key]}`).join('&');

export {
  dataFetcher,
  toQuery
};
