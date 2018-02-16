// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

//object destructuring
// var user = {name: 'fred', age: 25};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('Unable to connect to MongoDB Server');
    return;
  }
  console.log('Connected to MongoDB Server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do wah wah',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     console.log('Unable to insert Todo', err);
  //     return;
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Frederick Heald',
  //   age: 22,
  //   location: 'Somewhere over the rainblow'
  // }, (err, result) => {
  //   if (err) {
  //     console.log('Unable to insert User', err);
  //     return;
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Todos').find().toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos', err);
    return;
  });

  db.close();
});
