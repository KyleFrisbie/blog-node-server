const BlogPostsAPI = require('./controllers/api/blogposts-api');
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send({'success': true});
  });

  // blog post api
  //app.get('/api/blogposts', );
};
