/* @flow */

// Resources
const Station = require('./Station');

// Types

const Stations = (dataFetcher: Function): StationsResource => ({
  all: () => {
    return dataFetcher('station', {}).then(resp => {
      return resp['Stations'].map(station => Station.default(dataFetcher, station));
    });
  }
});

module.exports = {
  default: Stations
};
