import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

import {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  removeTodo,
} from './database';

const todoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: ({ _id }) => _id,
    },
    todo: {
      type: GraphQLString,
      resolve: ({ todo }) => todo,
    },
    completed: {
      type: GraphQLBoolean,
      resolve: ({ completed }) => completed
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    todo: {
      type: todoType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { _id }) => getTodo(_id),
    },
    todos: {
      type: new GraphQLList(todoType),
      resolve: () => getTodos(),
    },
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createTodo: {
      type: todoType,
      args: {
        todo: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { todo }) => createTodo(todo),
    },
    updateTodo: {
      type: todoType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        todo: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
      },
      resolve: (_, { _id, todo, completed }) =>
                  updateTodo(_id, todo, completed),
    },
    removeTodo: {
      type: todoType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, { _id }) => removeTodo(_id),
    }
  })
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
