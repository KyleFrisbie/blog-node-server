const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../index');
const Blogpost = require('../models/blogpost_model');

var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);

function fakeBlogpost() {
  return (
    new Blogpost({
      'title': faker.lorem.sentence(),
      'subtitle': faker.lorem.sentence(),
      'author': faker.fake("{{name.firstName}} {{name.lastName}}"),
      'imageURL': faker.image.imageUrl(),
      'createdOn': Date(faker.date.past()),
      'postBody': faker.lorem.paragraphs()
    }));
}

describe('BlogPost-Test', function () {
  Blogpost.collection.drop();

  it('should generate dummy blog post data to work with', function (done) {
    for (var i = 0; i < 50; i++) {
      var blogpost = fakeBlogpost();
        blogpost.save(function (err, blogpost) {
          if (err) done(err);
        });
    }
    done();
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
    var blogpost = fakeBlogpost();
    chai.request(server)
      .post('/api/blogposts/insert-blogpost')
      .send(blogpost)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('blogpost');
        res.body.success.should.equal(true);
        res.body.blogpost.should.be.a('object');
        res.body.blogpost.should.have.property('title');
        res.body.blogpost.should.have.property('subtitle');
        res.body.blogpost.should.have.property('author');
        res.body.blogpost.should.have.property('imageURL');
        res.body.blogpost.should.have.property('createdOn');
        res.body.blogpost.should.have.property('postBody');
        res.body.blogpost.title.should.equal(blogpost.title);
        res.body.blogpost.subtitle.should.equal(blogpost.subtitle);
        res.body.blogpost.author.should.equal(blogpost.author);
        // TODO: figure out how to implicitly convert blogpost date
        //res.body.blogpost.createdOn.should.equal(blogpost.createdOn);
        res.body.blogpost.imageURL.should.equal(blogpost.imageURL);
        res.body.blogpost.postBody.should.equal(blogpost.postBody);
        done();
      });
  });
});
