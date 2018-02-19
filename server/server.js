var mongoose = require('mongoose');

//use the global promise library, not a third party
mongoose.Promise = global.Promise;
//connect to the db
mongoose.connect('mongodb://localhost:27017/TodoApp');

//model - returns a constructor function
var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

var newTodo = new Todo({
  text: 'Cook Dinner'
});

newTodo.save().then((doc) => {
  console.log('Saved todo',doc);
}, (e) => {
  console.log('Unable to save todo');
});

var newTodo2 = new Todo({
  text: 'Read newspaper',
  completed: false,
  completedAt: 123
});

newTodo2.save().then((doc) => {
  console.log('Saved todo',doc);
}, (e) => {
  console.log('Unable to save todo');
});
