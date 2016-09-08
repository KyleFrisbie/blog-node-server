const Blogpost = require('../../models/blogpost_model');
const addTags = require('./addTags_function');

const BlogpostAPI = {};

BlogpostAPI.getAllBlogposts = function (req, res, next) {
  Blogpost.find(function (err, blogposts) {
    if (err) {
      return next(err);
    }
    return res.json({'blogposts': blogposts});
  });
};

BlogpostAPI.insertBlogpost = function (req, res, next) {
  var tagList = req.body.tags;
  if (tagList) {
    var promise = addTags(req.body.tags);
    promise.then(function (tags) {
      tagList = tags;
    });
  }
  const blogpost = new Blogpost({
    'title': req.body.title,
    'subtitle': req.body.subtitle,
    'createdOn': req.body.createdOn,
    'author': req.body.author,
    'imageURL': req.body.imageURL,
    'tags': tagList,
    'postBody': req.body.postBody
  });
  blogpost.save(function (err) {
    if (err) {
      res.json({
        'success': false,
        'blogpost': blogpost
      });
      return next(err);
    }
    res.json({
      'success': true,
      'blogpost': blogpost
    });
  });
};

BlogpostAPI.updateBlogpost = function (req, res, next) {
  var success = true;
  var promise = new Promise(function (resolve, reject) {
    Blogpost.findByIdAndUpdate(req.body._id, req.body, function (err, blogpost) {
      if (err) {
        success = false;
      }
      resolve(blogpost);
    });
  });

  promise.then(function (blogpost) {
    res.json({
      'success': success,
      'blogpost': blogpost
    });
  });
};

BlogpostAPI.removeBlogpost = function (req, res, next) {
  var success = true;
  var promise = new Promise(function (resolve, reject) {
    Blogpost.findByIdAndRemove(req.body._id, req.body, function (err, blogpost) {
      if (err) {
        success = false;
      }
      resolve(blogpost);
    });
  });

  promise.then(function (blogpost) {
    res.json({
      'success': success,
      'blogpost': blogpost
    });
  });
};

module.exports = BlogpostAPI;
