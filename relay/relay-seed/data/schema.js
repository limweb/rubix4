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

import { getWithType, isType } from '@sketchpixy/rubix/lib/node/relay-utils';

const GREETINGS = {
  hello: 'Hello, World!',
};

/* Interface */
const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let { type, id } = fromGlobalId(globalId);

    if (type === 'User') {
      return getWithType([], 'User');
    } else if (type === 'Greetings') {
      return getWithType('Greetings', GREETINGS);
    } else {
      return null;
    }
  },
  (obj) => {
    if ( isType(obj, 'User') ) {
      return UserType;
    } else if ( isType(obj, 'Greetings') ) {
      return GreetingsType;
    } else {
      return null;
    }
  }
);

const GreetingsType = new GraphQLObjectType({
  name: 'Greetings',
  fields: () => ({
    hello: { type: GraphQLString },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    greetings: {
      type: GreetingsType,
      resolve: () => GREETINGS,
    },
  }),
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    user: {
      type: UserType,
      resolve: () => [],
    }
  })
});

export default new GraphQLSchema({
  query: queryType,
});
