/* @flow */

// Resources
import Station from './Station';

const Stations = (dataFetcher: Function): StationsResource => ({
  all: () =>
    dataFetcher('station', {}).then(resp =>
      resp['Stations'].map(station => Station.default(dataFetcher, station))
    )
});

export default Stations;
