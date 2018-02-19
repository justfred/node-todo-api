const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todosSeed = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

//clear the database every time
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todosSeed);
  }).then(() => done());
});

describe('POST /todos', () => {
  it ('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  //good id
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todosSeed[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todosSeed[0].text);
      })
      .end(done);
  });
  //bad id
  it('should return 404 if todo not found', (done) => {
    // const notfID = '5a8b4b0093812ab31f09cef5';
    const notfID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${notfID}`)
      .expect(404)
      .end(done);
  });
  //invalid id
  it('should return 404 if bad id', (done) => {
//    const badID = '5a8b4b0093812ab31f09cef51111';
    const badID = new ObjectID().toHexString() + '111';
    request(app)
      .get(`/todos/${badID}`)
      .expect(404)
      .end(done);
  });
});
