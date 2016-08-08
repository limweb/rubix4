import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Todos = new Mongo.Collection('todos');

require('./seeder')(Todos);

Meteor.methods({
  'todos.setChecked'(_id, completed) {
    check(completed, Boolean);

    Todos.update({ _id },
                 { $set: { completed } });
  },
  'todos.remove'(_id) {
    Todos.remove({ _id });
  },
  'todos.create'(todo) {
    check(todo, String);

    if (todo.length <= 0) {
      throw new Meteor.Error(403, `'todo' should not be empty!`);
      return;
    }

    Todos.insert({ todo, completed: false });
  },
  'todos.update'(_id, todo, completed) {
    check(todo, String);
    check(completed, Boolean);

    Todos.update({ _id },
                 { $set: { todo, completed } });
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('todos', () => {
    return Todos.find();
  });

  Meteor.publish('todo', (_id) => {
    return Todos.find({ _id });
  });
}
