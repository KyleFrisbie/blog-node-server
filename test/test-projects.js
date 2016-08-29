const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../server/index');
const Project = require('../server/models/project_model');

var should = chai.should();
chai.use(chaiHttp);

function fakeProject() {
  return (
    new Project({
      'title': faker.lorem.sentence(),
      'subtitle': faker.lorem.sentence(),
      'author': faker.fake("{{name.firstName}} {{name.lastName}}"),
      'imageURL': faker.image.imageUrl(),
      'tags': [{'name': faker.lorem.word()}, {'name': faker.lorem.word()}, {'name': faker.lorem.word()}],
      'createdOn': Date(faker.date.past()),
      'postBody': faker.lorem.paragraphs()
    }));
}

describe('Project-Test', function () {
  Project.collection.drop();

  it('should generate dummy project data to work with', function (done) {
    for (var i = 0; i < 50; i++) {
      var project = fakeProject();
      project.save(function (err, project) {
        if (err) done(err);
      });
    }
    done();
  });

  it('should get all projects from /api/projects GET', function (done) {
    chai.request(server)
      .get('/api/projects')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });

  it('should post a single project to /api/insert-project POST', function (done) {
    var project = fakeProject();
    chai.request(server)
      .post('/api/projects/insert-project')
      .send(project)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('project');
        res.body.success.should.equal(true);
        res.body.project.should.be.a('object');
        res.body.project.should.have.property('title');
        res.body.project.title.should.equal(project.title);
        res.body.project.should.have.property('subtitle');
        res.body.project.subtitle.should.equal(project.subtitle);
        res.body.project.should.have.property('author');
        res.body.project.author.should.equal(project.author);
        res.body.project.should.have.property('imageURL');
        res.body.project.imageURL.should.equal(project.imageURL);
        res.body.project.should.have.property('postBody');
        res.body.project.postBody.should.equal(project.postBody);
        res.body.project.should.have.property('createdOn');
        // TODO: figure out how to implicitly convert project date
        //res.body.project.createdOn.should.equal(project.createdOn);
        res.body.project.should.have.property('tags');
        res.body.project.tags.should.be.a('Array')
          .and.have.lengthOf(3);
        done();
      });
  });

  describe('retries', function () {
    this.retries(4);

    it('should update a project with new values to /api/update-project POST', function (done) {
      var project = fakeProject();
      project.save();
      var newTitle = faker.lorem.sentence();
      project.title = newTitle;
      project.tags = [];
      chai.request(server)
        .put('/api/projects/update-project')
        .send(project)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('success');
          res.body.success.should.equal(true);
          res.body.should.have.property('project');
          res.body.project.should.be.a('object');
          res.body.project.should.have.property('title');
          res.body.project.title.should.equal(newTitle);
          res.body.project.should.have.property('subtitle');
          res.body.project.subtitle.should.equal(project.subtitle);
          res.body.project.should.have.property('author');
          res.body.project.author.should.equal(project.author);
          res.body.project.should.have.property('imageURL');
          res.body.project.imageURL.should.equal(project.imageURL);
          res.body.project.should.have.property('postBody');
          res.body.project.postBody.should.equal(project.postBody);
          res.body.project.should.have.property('createdOn');
          // TODO: figure out how to implicitly convert project date
          //res.body.project.createdOn.should.equal(project.createdOn);
          res.body.project.should.have.property('tags');
          res.body.project.tags.should.be.a('Array')
            .and.have.lengthOf(0);
          done();
        });
    });
  });

  it('should remove a project from the collection by /api/projects/remove-project', function (done) {
    var project = fakeProject();
    project.save();
    chai.request(server)
      .delete('/api/projects/remove-project')
      .send(project)
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        done();
      })
  });

});
