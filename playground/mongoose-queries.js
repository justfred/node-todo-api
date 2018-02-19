const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

//good id
//var id = '5a8b4b0093812ab31f09cef9';
//bad id
// var id = '6a8b4b0093812ab31f09cef9';
//invalid id
// var id = '5a8b4b0093812ab31f09cef9111';

// //use ObjectID to validate id
// if(!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// };

// //mongoose doesn't need converted ids
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos :',todos);
// });
//
// //use findOne if you expect one
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo :',todo);
// });

// //findById is even better
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo ById :',todo);
// }).catch((e) => console.log(e));

//Challenge; same thing for user
//good id
var userId = '5a8b302115722f99102333ce';
//bad id
// var userId = '6a8b302115722f99102333ce';
//invalid id
// var userId = '5a8b302115722f99102333ce11';

if(!ObjectID.isValid(userId)) {
  console.log('userId not valid');
};

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('userId not found');
  }
  console.log('User ById :',user);
}, (e) => {
  console.log(e);
});
