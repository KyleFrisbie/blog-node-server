var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server/index');

var should = chai.should();
chai.use(chaiHttp);

describe('BlogPost-Test', function () {
  it('should get all blog posts from /api/blogposts GET', function () {
    chai.request(server)
      .get('/api/blogposts')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  })
});
