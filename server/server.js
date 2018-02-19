var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//middleware
app.use(bodyParser.json());

//POST /todos
app.post('/todos', (req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    //send an object, because it's more flexible in the future
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /toods/ID

app.listen(3000, () => {
  console.log('Started on port 3000');
})

module.exports = {app};
