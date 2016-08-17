const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../index');
const Blogpost = require('../models/blogpost_model');

var should = chai.should();
chai.use(chaiHttp);

describe('BlogPost-Test', function () {
  Blogpost.collection.drop();

  beforeEach(function (done) {
    new Blogpost({
      'title': faker.lorem.sentence(),
      'subtitle': faker.lorem.sentence(),
      'createdOn': Date(faker.date.past()),
      'postBody': faker.lorem.paragraphs()
    }).save(function (err) {
      done();
    });
  });

  afterEach(function (done) {
    Blogpost.collection.drop();
    done();
  });

  it('should generate dummy blog post data to work with', function (done) {

  });

  it('should get all blog posts from /api/blogposts GET', function (done) {
    chai.request(server)
      .get('/api/blogposts')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
  it('should post a single blog post to /api/add-blogpost', function (done) {
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
        done();
      });
  });
});
