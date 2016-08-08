import pmongo from 'promised-mongo';

let MONGODB_URI = 'relaytest';

if (process.env.MONGODB_URI) MONGODB_URI = process.env.MONGODB_URI;

const db = pmongo(MONGODB_URI, {
  authMechanism: 'ScramSHA1'
}, ['users', 'todos']);

console.log('Setup db.relaytest with "users" and "todos" collections');

const todos = [
  'Prepare new Billing format',
  'Create benefits presentation',
  'Prepare productivity report',
  'Review non-exempt evaluations',
  'Update insurance information',
];

async function setup() {
  // clear users and todos collections
  await db.users.drop();
  await db.todos.drop();
  console.log('Cleared "users" and "todos" collections');

  // create a user
  await db.users.update({name: 'admin'}, {$set: {name: 'admin'}}, {upsert: true});

  console.log('Finished creating sample user');

  // load todos
  for (var i = 0; i < todos.length; i++) {
    await db.todos.update({todo: todos[i]}, {$set: {
      todo: todos[i],
      completed: false,
      user: 'admin'
    }}, {upsert: true});
  }

  console.log('Finished creating sample todos');

  db.close();

  process.exit();
}

setup();
