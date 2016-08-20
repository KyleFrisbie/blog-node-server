const Blogpost = require('../../models/blogpost_model');
const Tag = require('../../models/tag_model').TagModel;

const BlogpostAPI = {};


function addTag(tagList) {
  return new Promise(function (resolve, reject) {
    var tags = [];
    console.log('tag', tag);
    tagList.forEach(function (tag) {
      Tag.findOne({'name': tag.name}, function (err, foundTag) {
        if (err) {
          reject(Error(err));
        }
        if (!foundTag) {
          foundTag = new Tag({
            'name': tag.name
          });
          foundTag.save();
        }
        tags.push(foundTag);
      });
    });
    resolve(tags);
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
  var tagList = req.body.tags;
  if (tagList) {
    var promise = addTag(req.body.tags);
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
}
;

module.exports = BlogpostAPI;
