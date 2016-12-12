var hasOwn = {}.hasOwnProperty;

const CimisResource = function(cimis, urlData) {
  this._cimis = cimis;
  this._urlData = urlData || {};

  this.basePath = "http://et.water.ca.gov/api";
  this.headers = {
    "User-Agent": "Cimis Node v1.0",
    "Content-Type": "application/json",
    "Accept": "*/*"
  };

  this.initialize.apply(this, arguments);
}

CimisResource.prototype = {
  initialize: function () {},
  _fetchData: function(path, options = {}) {
    const params = Object.assign(options, { appKey: this.appKey });
    return fetch(`${this.basePath}/${path}?${this.toQuery(params)}`, {
      method: 'GET',
      headers: this.headers
    })
    .then(response => response.json());
    //response.body["Data"]["Providers"].first["Records"].map do |record|
    //  StationData.new(record)
    //end
  },
  _toQuery: function(params) {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
  },
};

CimisResource.extend = function(sub) {
  var Super = this;
  var Constructor = hasOwn.call(sub, 'constructor') ? sub.constructor : function() {
    Super.apply(this, arguments);
  };
  Constructor.prototype = Object.create(Super.prototype);
  for (var i in sub) {
    if (hasOwn.call(sub, i)) {
      Constructor.prototype[i] = sub[i];
    }
  }
  for (i in Super) {
    if (hasOwn.call(Super, i)) {
      Constructor[i] = Super[i];
    }
  }
  return Constructor;
}

module.exports = CimisResource;
