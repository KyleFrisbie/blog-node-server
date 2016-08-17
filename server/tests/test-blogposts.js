const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../index');
const Blogpost = require('../models/blogpost_model');

var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);

describe('BlogPost-Test', function () {
  Blogpost.collection.drop();

  it('should generate dummy blog post data to work with', function (done) {
    for (var i = 0; i < 50; i++) {
      var blogpost = new Blogpost({
        'title': faker.lorem.sentence(),
        'subtitle': faker.lorem.sentence(),
        'createdOn': Date(faker.date.past()),
        'postBody': faker.lorem.paragraphs()
      });
      blogpost.save(function (err, blogpost) {
        if (err) done(err);
      });
    }
    done();
    //Blogpost.count({}, function (err, count) {
    //  console.log('count is:', couint);
    //  assert.equal(50, count);
    //  done();
    //});
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
  it('should post a single blog post to /api/insert-blogpost', function (done) {
    chai.request(server)
      .post('/api/blogposts/insert-blogpost')
      .send({
        'title': faker.random.words(),
        'subtitle': faker.random.words(),
        'createdOn': Date(faker.date.past()),
        'postBody': faker.random.words()
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});
