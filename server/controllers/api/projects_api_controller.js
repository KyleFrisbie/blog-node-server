const Project = require('../../models/project_model');
const addTags = require('./addTags_function');

const ProjectAPI = {};

ProjectAPI.getAllProjects = function (req, res, next) {
  Project.find(function (err, projects) {
    if (err) {
      return next(err);
    }
    return res.json({'projects': projects});
  });
};

ProjectAPI.insertProject = function (req, res, next) {
  var tagList = req.body.tags;
  if (tagList) {
    var promise = addTags(req.body.tags);
    promise.then(function (tags) {
      tagList = tags;
    });
  }
  const project = new Project({
    'title': req.body.title,
    'subtitle': req.body.subtitle,
    'createdOn': req.body.createdOn,
    'author': req.body.author,
    'imageURL': req.body.imageURL,
    'tags': tagList,
    'postBody': req.body.postBody
  });
  project.save(function (err) {
    if (err) {
      res.json({
        'success': false,
        'project': project
      });
      return next(err);
    }
    res.json({
      'success': true,
      'project': project
    });
  });
};

ProjectAPI.updateProject = function (req, res, next) {
  var success = true;
  var promise = new Promise(function (resolve, reject) {
    Project.findByIdAndUpdate(req.body._id, req.body, function (err, project) {
      if (err) {
        success = false;
      }
      resolve(project);
    });
  });

  promise.then(function (project) {
    res.json({
      'success': success,
      'project': project
    });
  });
};

ProjectAPI.removeProject = function (req, res, next) {
  var success = true;
  var promise = new Promise(function (resolve, reject) {
    Project.findByIdAndRemove(req.body._id, req.body, function (err, project) {
      if (err) {
        success = false;
      }
      resolve(project);
    });
  });

  promise.then(function (project) {
    res.json({
      'success': success,
      'project': project
    });
  });
};

module.exports = ProjectAPI;
