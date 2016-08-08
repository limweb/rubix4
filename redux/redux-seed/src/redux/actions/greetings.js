import {
  GET_GREETING
} from './actionTypes';

import axios from 'axios';

import GraphQLSettings from '../../../graphql.json';

let GraphQLEndpoint = GraphQLSettings.development.endpoint;

if (process.env.NODE_ENV === 'production') {
  GraphQLEndpoint = GraphQLSettings.production.endpoint;
}

function getGreeting(inputMessage) {
  let query = `
    query echoGreeting($inputMessage: String) {
      greetings {
        hello(message: $inputMessage)
      }
    }
  `;

  let variables = { inputMessage };

  return dispatch => {
    return axios.post(GraphQLEndpoint, {
      query,
      variables
    }).then((result) => {
      dispatch({
        type: GET_GREETING,
        result: result.data,
      });
    }).catch((error) => {
      dispatch({
        type: GET_GREETING,
        error,
      });
    });
  };
}

module.exports = {
  getGreeting,
};
