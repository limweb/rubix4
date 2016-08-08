import pmongo from 'promised-mongo';

let MONGODB_URI = 'reduxtest';

if (process.env.MONGODB_URI) MONGODB_URI = process.env.MONGODB_URI;

const db = pmongo(MONGODB_URI, {
  authMechanism: 'ScramSHA1'
}, ['todos']);

export function getTodo(_id) {
  return db.todos.findOne({ _id: pmongo.ObjectId(_id) });
}

export function getTodos() {
  return db.todos.find({});
}

export function createTodo(todo) {
  if (!todo) {
    return new Promise((resolve, reject) => {
      reject(`"todo" cannot be empty`);
    });
  }

  return db.todos.insert({ todo, completed: false });
}

export function removeTodo(_id) {
  return db.todos.remove({ _id: pmongo.ObjectId(_id) })
                 .then(() => {
                    return { _id: _id };
                 });
}

export function updateTodo(_id, todo, completed) {
  let todoItem = {
    todo, completed
  };

  if (!_id) return new Promise((resolve, reject) => {
    reject(`"_id" required to update Todo Item\n`);
  });

  if (!todo) delete todoItem.todo;
  if (typeof completed !== 'boolean') delete todoItem.completed;

  return db.todos.findAndModify({
            new: true, // return the newly modified document
            query: { _id: pmongo.ObjectId(_id) },
            update: { $set: todoItem } }).then(({ value }) => value);
}
