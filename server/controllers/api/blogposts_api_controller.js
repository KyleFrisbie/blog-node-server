const Blogpost = require('../../models/blogpost_model');
const Tag = require('../../models/tag_model').TagModel;

const BlogpostAPI = {};

BlogpostAPI.getAllBlogposts = function (req, res, next) {
  Blogpost.find(function(err, blogposts) {
    if (err) {
      return next(err);
    }
    return res.json({'blogposts': blogposts});
  });
};

BlogpostAPI.insertBlogpost = function (req, res, next) {
  const blogpost = new Blogpost({
    'title': req.body.title,
    'subtitle': req.body.subtitle,
    'createdOn': req.body.createdOn,
    'author': req.body.author,
    'imageURL': req.body.imageURL,
    'tags': req.body.tags,
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

BlogpostAPI.addTag = function(req, res, next) {
  console.log('PATH:');
  Tag.findOne({'tag': req.body.name}, function (err, tag) {
    if(err) {
      var tag = new Tag({
        'name': req.body.name
      });
      tag.save(function (err) {
        if(err) {
          return next(err);
        }
      });
    }
    Blogpost.findById(req.params.blogpostId, function (err, blogpost) {
    if (err) {
      res.send({
        'success': false,
        'blogpost': blogpost,
        'tag': tag
      });
      return next(err);
    }
    console.log('tag:', tag);
    blogpost.tags.push(tag);
    res.send({
      'success': true,
      'blogpost': blogpost
    });
    })
  });
};

module.exports = BlogpostAPI;
