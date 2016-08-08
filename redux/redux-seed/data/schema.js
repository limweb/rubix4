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

const greetingsType = new GraphQLObjectType({
  name: 'Greetings',
  fields: () => ({
    hello: {
      type: GraphQLString,
      args: {
        message: {
          type: GraphQLString
        }
      },
      resolve(parentValue, { message }) {
        return `received: ${message}`;
      }
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    greetings: {
      type: greetingsType,
      resolve: () => "",
    },
  })
});

export default new GraphQLSchema({
  query: queryType,

  /* uncomment this line when you add your own mutations */
  // mutation: mutationType,
});
