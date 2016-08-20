const Blogpost = require('../../models/blogpost_model');
const Tag = require('../../models/tag_model').TagModel;

const BlogpostAPI = {};


function addTag(tag) {
  return new Promise(function (resolve, reject) {
    console.log('tag', tag);
    Tag.findOne({'name': tag.name}, function (err, foundTag) {
      if(err) {
        reject(Error(err));
      }
      if (!foundTag) {
        foundTag = new Tag({
          'name': tag.name
        });
        foundTag.save();
      }
      resolve({
        '_id': foundTag._id,
        'name': foundTag.name
      });
    });
  });
}

BlogpostAPI.getAllBlogposts = function (req, res, next) {
  Blogpost.find(function (err, blogposts) {
    if (err) {
      return next(err);
    }
    return res.json({'blogposts': blogposts});
  });
};

BlogpostAPI.insertBlogpost = function (req, res, next) {
  var tags = [];
  if (req.body.tags) {
    req.body.tags.forEach(function (tag) {
      var promise = addTag(tag);
      promise.then(function(tag) {
        console.log(tag);
        tags.push(tag);
      });
    });
  }
  const blogpost = new Blogpost({
    'title': req.body.title,
    'subtitle': req.body.subtitle,
    'createdOn': req.body.createdOn,
    'author': req.body.author,
    'imageURL': req.body.imageURL,
    'tags': tags,
    'postBody': req.body.postBody
  });
  blogpost.save(function (err) {
    if (err) {
      res.send({
        'success': false,
        'blogpost': blogpost
      });
      return next(err);
    }
    res.send({
      'success': true,
      'blogpost': blogpost
    });
  });
};

module.exports = BlogpostAPI;
