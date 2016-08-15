var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server/index');

var should = chai.should();
chai.use(chaiHttp);

describe('Server-Test', function () {
  it('should make a request at the root of the application "/"', function () {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.equal('hello world!');
      })
  })
});
