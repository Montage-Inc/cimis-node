declare type StationResource = {
  detail: Object,
  fetchData: (
    params: {
      options: Object,
      hourly: boolean
    }
  ) => Promise<any>
};
