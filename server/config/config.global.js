var config = {};

config.env = 'development';
config.hostname = 'dev.kylelfrisbie.com';

config.mongo = {};
config.mongo.uri = process.env.MONGO_URI || 'localhost';
config.mongo.db = 'kylefrisbie_com_dev';

module.exports = config;
