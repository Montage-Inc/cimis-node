/* @flow */

const R = require('ramda');
const moment = require('moment');

const Station = (
  dataFetcher: Function,
  detail: Object
): StationResource => {
  const removeDataItems = (value, key) => key !== 'dataItems';
  const hourlyOptions = [
    'hly-air-tmp',
    'hly-dew-pnt',
    'hly-eto',
    'hly-net-rad',
    'hly-asce-eto',
    'hly-asce-etr',
    'hly-precip',
    'hly-rel-hum',
    'hly-res-wind',
    'hly-soil-tmp',
    'hly-sol-rad',
    'hly-vap-pres',
    'hly-wind-dir',
    'hly-wind-spd'
  ].join(',');

  return {
    detail,
    fetchData: async ({ options = {}, hourly = true } = {}) => {
      const lens = R.lensPath(['Data', 'Providers', 0, 'Records']);
      const params = R.merge({
        dataItems: hourlyOptions,
        targets: detail['StationNbr'],
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD')
      }, options);
      const filteredParams = R.ifElse(
        R.always(hourly),
        R.always(params),
        R.pickBy(removeDataItems)
      )(params);

      return dataFetcher('data', filteredParams).then(data => R.view(lens, data));
    }
  };
};

module.exports = {
  default: Station
};
