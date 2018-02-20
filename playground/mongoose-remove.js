const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '57bf38394b39c93d2a557e9811';

if (!ObjectID.isValid(id)) {
  console.log('ID not valid');
}

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove({
//   _id: id
// }).then((todo) => {
//   //we get back info
//   console.log('Todo', todo);
// });

Todo.findByIdAndRemove(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo By Id', todo);
}).catch((e) => console.log(e));
