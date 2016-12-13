const chai = require('chai');
const expect = chai.expect;

const modules = require('../lib/Utils');
const toQuery = modules.toQuery;

describe('toQuery', function() {
  it('makes an object into a query string', function() {
    const expected = 'foo=1&bar=2';
    const result = toQuery({ foo: 1, bar: 2 });
    expect(result).to.eql(expected);
  });
});
