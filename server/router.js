const BlogPostsAPI = require('./controllers/api/blogposts-api');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send({'SUCCESS': true});
  });

  // blog post api
  app.get('/api/blogposts', BlogPostsAPI.getAllBlogposts);
};
