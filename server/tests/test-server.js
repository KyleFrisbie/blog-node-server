var chai = require('chai');
var chaiHttp = require('chai-http');
process.env.NODE_ENV = 'test';
var server = require('../index');
console.log(process.env.NODE_ENV);

var should = chai.should();
chai.use(chaiHttp);

describe('Server-Test', function () {
  it('should make a request at the root of the application "/"', function () {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });
  it('should fail to post something to the root of the application "/" POST', function () {
    chai.request(server)
      .post('/')
      .send({
        'post': 'item'
      })
      .end(function (err, res) {
        res.should.not.have.status(200);
      });
  });
});
