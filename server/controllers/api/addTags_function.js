const Tag = require('../../models/tag_model').TagModel;

var addTags = function (tagList) {
  return new Promise(function (resolve, reject) {
    var tags = [];
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
};

module.exports = addTags;
