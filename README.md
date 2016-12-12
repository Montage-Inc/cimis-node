# Cimis Node

A small Node wrapper for the Cimis API.

## Installation

### NPM

```bash
$ npm install cimis-node
```

### Yarn

```bash
$ yarn add cimis-node
```

## Usage

You must have an app key supplied by CIMIS in order to use most parts of the
API. Details about registereing with CIMIS can be found here: http://et.water.ca.gov/Home/Register/

```js
import Cimis from 'cimis-node';

const cimis = Cimis("my-super-secret-app-key");

cimis.stations.all().then(stations => {
  stations[1].fetchData().then(data => console.log(data))
});
```

## Exports

### Default

`Cimis`

### toQuery

```
(Object) -> String
```

Takes in a JavaScript object and returns a query string.

### dataFetcher

```
(appKey) -> (path) -> (options) -> Promise
```

Takes the `appKey`, a URL `path` to append to the base API path, and a list
of `options` to pass in the query string and returns a `Promise`

## API

### Cimis

```
(appKey) -> { stations: Stations }
```

The main wrapper for the API, allows you to fetch all of the stations.
When stations are fetched, will return a list of `Station` objects.

### Stations

```
{ all: () -> List<Station> }
```

The canonical way to get a list of all Stations.

### Station

```
{
  detail: Object,
  fetchData: ({ options: Object, hourly: Boolean = true }) -> Object
}
```

A CIMIS weather station. The `detail` key contains data about the station itself
and the `fetchData` function fetches data for that station.

#### StationOptions

```
{
  startDate: DateString = CurrentDate,
  endDate: DateString = CurrentDate
}
```

#### CurrentDate

```
String<YYYY-MM-DD>
```

