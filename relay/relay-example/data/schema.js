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
  toGlobalId,
  fromGlobalId,
  globalIdField,
  offsetToCursor,
  connectionArgs,
  nodeDefinitions,
  connectionFromArray,
  connectionDefinitions,
  connectionFromPromisedArray,
  mutationWithClientMutationId
} from 'graphql-relay';

import {
  addTodo,
  getUser,
  getTodo,
  getTodos,
  removeTodo,
  updateTodo
} from './database';

import { getWithType, isType } from '@sketchpixy/rubix/lib/node/relay-utils';

/* Interface */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { type, id } = fromGlobalId(globalId);

    if (type === 'User') {
      return getWithType(getUser(id), 'User');
    } else if (type === 'Todo') {
      return getWithType(getTodo(id), 'Todo');
    } else {
      return null;
    }
  },
  (obj) => {
    if ( isType(obj, 'User') ) {
      return userType;
    } else if ( isType(obj, 'Todo') ) {
      return todoType;
    } else {
      return null;
    }
  }
);



/* Basic Types */
const todoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'A todo item',
  fields: () => ({
    id: globalIdField('Todo', ({ _id }) => _id),
    _id: {
      type: GraphQLString,
      description: 'Todo id',
      resolve: ({ _id }) => _id,
    },
    todo: {
      type: GraphQLString,
      description: 'The todo text',
      resolve: ({ todo }) => todo,
    },
    completed: {
      type: GraphQLBoolean,
      description: 'Status of Todo item',
      resolve: ({ completed }) => completed,
    },
  }),
  interfaces: [nodeInterface],
});

const {
  connectionType: todoConnection,
        edgeType: todoEdge
} = connectionDefinitions({
      name: 'Todo',
  nodeType: todoType
});

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'Main User',
  fields: () => ({
    id: globalIdField('User', ({ _id }) => _id),
    todos: {
      type: todoConnection,
      description: 'A list of Todos',
      args: connectionArgs,
      resolve: (user, args) => {
        return connectionFromPromisedArray(getTodos(), args);
      }
    },
    getTodo: {
      type: todoType,
      description: 'A single Todo Item',
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: (user, {id}) => {
        if (!id) return;
        return getTodo(fromGlobalId(id).id);
      }
    }
  }),
  interfaces: [nodeInterface],
});


/* Mutations */
const AddTodoMutation = mutationWithClientMutationId({
  name: 'AddTodo',
  inputFields: {
    todo: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    todoEdge: {
      type: todoEdge,
      resolve: ({ _id, todo, completed }) => {
        return getTodos().then((todos) => {
          /**
            We make use of offsetToCursor to figure out the todo item's offset
            instead of cursorForObjectInConnection. This is because
            cursorForObjectInConnection uses indexOf to do a shallow scan (
            instead of a deep scan) of items. We manually scan the todo list
            to find the location todo item and then use offsetToCursor to get
            the Relay equivalent base64 encoded representation of the offset.
          */
          var offset = 0;

          // figure out where the todo item is located in the list of todos
          for (var i = 0; i < todos.length; i++) {
            if (todos[i]._id.equals(_id)) {
              // found the offset
              offset = i;
              break;
            }
          }

          return {
            cursor: offsetToCursor(offset),
            node: { _id, todo, completed },
          }
        });
      }
    },
    user: {
      type: userType,
      resolve: () => getUser(),
    },
    error: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: ({todo}) => addTodo(todo)
});

const UpdateTodoMutation = mutationWithClientMutationId({
  name: 'UpdateTodo',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    todo: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
  outputFields: {
    todo: {
      type: todoType,
      resolve: ({ todo }) => getTodo(todo)
    },
    user: {
      type: userType,
      resolve: () => getUser(),
    },
  },
  mutateAndGetPayload: ({ id, todo, completed }) =>
                          updateTodo(fromGlobalId(id).id, todo, completed)
});

const RemoveTodoMutation = mutationWithClientMutationId({
  name: 'RemoveTodo',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    todoIdToBeDeleted: {
      type: GraphQLID,
      resolve: ({ todo }) => toGlobalId('Todo', todo),
    },
    user: {
      type: userType,
      resolve: () => getUser(),
    },
  },
  mutateAndGetPayload: ({ id }) => removeTodo(fromGlobalId(id).id)
});


/* Query Type */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      type: userType,
      resolve: () => getUser(),
    }
  })
});



/* Mutation Type */
const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addTodo: AddTodoMutation,
    updateTodo: UpdateTodoMutation,
    removeTodo: RemoveTodoMutation,
  }),
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
