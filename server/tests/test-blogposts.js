const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../index');
const Blogpost = require('../models/blogpost_model');

var should = chai.should();
chai.use(chaiHttp);

describe('BlogPost-Test', function () {
  Blogpost.collection.drop();
  it('should get all blog posts from /api/blogposts GET', function () {
    chai.request(server)
      .get('/api/blogposts')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('should post a single blog post to /api/add-blogpost', function () {
    chai.request(server)
      .post('/api/blogposts/add-blogpost')
      .send({
        'title': faker.random.words(),
        'subtitle': faker.random.words(),
        'createdOn': faker.date,
        'postBody': faker.random.words()
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
      })
  })
});
