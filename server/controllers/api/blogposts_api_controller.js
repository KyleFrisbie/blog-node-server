const Blogpost = require('../../models/blogpost_model');

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
  console.log('req.body: ', req.body);
  const blogpost = new Blogpost({
    'title': req.body.title,
    'subtitle': req.body.subtitle,
    'createdOn': req.body.createdOn,
    'postBody': req.body.postBody
  });
  blogpost.save(function (err) {
    if (err) return next(err);
    res.send({'blogpost': blogpost});
  });
};

module.exports = BlogpostAPI;
