import { Meteor } from 'meteor/meteor';

export default function(Todos) {
  if (Meteor.isServer) {
    if (process.env.NODE_ENV !== 'production') {
      const todos = Todos.find({}).fetch();
      const data = [
        'Prepare new Billing format',
        'Create benefits presentation',
        'Prepare productivity report',
        'Review non-exempt evaluations',
        'Update insurance information',
      ];

      if (!todos.length) {
        for (let i = 0; i < data.length; i++) {
          Todos.insert({
            todo: data[i],
            completed: false
          });
        }
      }
    }
  }
}
