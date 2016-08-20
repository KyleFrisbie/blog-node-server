const BlogpostsAPI = require('./controllers/api/blogposts_api_controller');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send({'SUCCESS': true});
  });

  // blog post api
  app.get('/api/blogposts', BlogpostsAPI.getAllBlogposts);
  app.post('/api/blogposts/insert-blogpost', BlogpostsAPI.insertBlogpost);
};
