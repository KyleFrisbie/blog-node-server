const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogpostSchema = new Schema({
  title: String,
  subtitle: String,
  createdOn: Date,
  author: String,
  imageURL: String,
  postBody: String
});

const BlogpostModel = mongoose.model('blogpost', blogpostSchema);

module.exports = BlogpostModel;

