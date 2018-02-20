var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

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
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  //Check for invalid id
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  Todo.findById(id).then((todo) => {
    //check for not found
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    //just send 400 response
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {app};
