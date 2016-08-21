const BlogpostsAPI = require('./controllers/api/blogposts_api_controller');
const ProjectAPI = require('./controllers/api/projects_api_controller');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send({'SUCCESS': true});
  });

  // blog post api
  app.get('/api/blogposts', BlogpostsAPI.getAllBlogposts);
  app.post('/api/blogposts/insert-blogpost', BlogpostsAPI.insertBlogpost);
  app.put('/api/blogposts/update-blogpost', BlogpostsAPI.updateBlogpost);
  app.delete('/api/blogposts/remove-blogpost', BlogpostsAPI.removeBlogpost);

  // project api
  app.get('/api/projects', ProjectAPI.getAllProjects);
  app.post('/api/projects/insert-project', ProjectAPI.insertProject);
  app.put('/api/projects/update-project', ProjectAPI.updateProject);
  app.delete('/api/projects/remove-project', ProjectAPI.removeProject);
};
