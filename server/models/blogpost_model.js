const mongoose = require('mongoose');
const tagSchema = require('./tag_model').tagSchema;
const Schema = mongoose.Schema;

const blogpostSchema = new Schema({
  title: String,
  subtitle: String,
  createdOn: Date,
  author: String,
  tags: [tagSchema],
  imageURL: String,
  postBody: String
});

const BlogpostModel = mongoose.model('blogposts', blogpostSchema);

module.exports = BlogpostModel;

