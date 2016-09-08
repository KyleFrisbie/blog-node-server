var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/index');

var should = chai.should();
chai.use(chaiHttp);

describe('Server-Test', function () {
  it('should make a request at the root of the application "/"', function (done) {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });
  it('should fail to post something to the root of the application "/" POST', function (done) {
    chai.request(server)
      .post('/')
      .send({
        'post': 'item'
      })
      .end(function (err, res) {
        res.should.not.have.status(200);
        done();
      });
  });
});
