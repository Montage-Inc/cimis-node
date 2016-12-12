const Station = require('./Station');

const Stations = (dataFetcher) => ({
  all: () => {
    return dataFetcher('station', {}).then(resp => {
      return resp['Stations'].map(station => Station(dataFetcher, station));
    });
  }
});

module.exports = Stations;
