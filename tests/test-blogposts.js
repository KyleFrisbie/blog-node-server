const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../src/index');
const Blogpost = require('../src/models/blogpost_model');

var should = chai.should();
chai.use(chaiHttp);

function fakeBlogpost() {
  return (
    new Blogpost({
      'title': faker.lorem.sentence(),
      'subtitle': faker.lorem.sentence(),
      'author': faker.fake("{{name.firstName}} {{name.lastName}}"),
      'imageURL': faker.image.imageUrl(),
      'tags': [{'name': faker.lorem.word()}, {'name': faker.lorem.word()}, {'name': faker.lorem.word()}],
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

  it('should post a single blog post to /api/insert-blogpost POST', function (done) {
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
        res.body.blogpost.title.should.equal(blogpost.title);
        res.body.blogpost.should.have.property('subtitle');
        res.body.blogpost.subtitle.should.equal(blogpost.subtitle);
        res.body.blogpost.should.have.property('author');
        res.body.blogpost.author.should.equal(blogpost.author);
        res.body.blogpost.should.have.property('imageURL');
        res.body.blogpost.imageURL.should.equal(blogpost.imageURL);
        res.body.blogpost.should.have.property('postBody');
        res.body.blogpost.postBody.should.equal(blogpost.postBody);
        res.body.blogpost.should.have.property('createdOn');
        // TODO: figure out how to implicitly convert blogpost date
        //res.body.blogpost.createdOn.should.equal(blogpost.createdOn);
        res.body.blogpost.should.have.property('tags');
        res.body.blogpost.tags.should.be.a('Array')
          .and.have.lengthOf(3);
        done();
      });
  });

  it('should update a blog post with new values to /api/update-blogpost POST', function (done) {
    var blogpost = fakeBlogpost();
    blogpost.save();
    var newTitle = faker.lorem.sentence();
    blogpost.title = newTitle;
    blogpost.tags = [];
    chai.request(server)
      .put('/api/blogposts/update-blogpost')
      .send(blogpost)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.should.have.property('blogpost');
        res.body.blogpost.should.be.a('object');
        res.body.blogpost.should.have.property('title');
        res.body.blogpost.title.should.equal(newTitle);
        res.body.blogpost.should.have.property('subtitle');
        res.body.blogpost.subtitle.should.equal(blogpost.subtitle);
        res.body.blogpost.should.have.property('author');
        res.body.blogpost.author.should.equal(blogpost.author);
        res.body.blogpost.should.have.property('imageURL');
        res.body.blogpost.imageURL.should.equal(blogpost.imageURL);
        res.body.blogpost.should.have.property('postBody');
        res.body.blogpost.postBody.should.equal(blogpost.postBody);
        res.body.blogpost.should.have.property('createdOn');
        // TODO: figure out how to implicitly convert blogpost date
        //res.body.blogpost.createdOn.should.equal(blogpost.createdOn);
        res.body.blogpost.should.have.property('tags');
        res.body.blogpost.tags.should.be.a('Array')
          .and.have.lengthOf(0);
        done();
      });
  });

  it('should remove a blog post from the collection by /api/blogposts/remove-blogpost', function (done) {
    var blogpost = fakeBlogpost();
    blogpost.save();
    chai.request(server)
      .delete('/api/blogposts/remove-blogpost')
      .send(blogpost)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        done();
      })
  });

});
