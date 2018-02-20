var mongoose = require('mongoose');

//use the global promise library, not a third party
mongoose.Promise = global.Promise;
//connect to the db
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
