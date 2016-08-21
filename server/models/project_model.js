const mongoose = require('mongoose');
const tagSchema = require('./tag_model').tagSchema;
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  subtitle: String,
  createdOn: Date,
  author: String,
  tags: [tagSchema],
  imageURL: String,
  postBody: String
});

const ProjectModel = mongoose.model('projects', projectSchema);

module.exports = ProjectModel;
