import {
  GET_GREETING
} from '../actions/actionTypes';

function greetings(state = [], action) {
  switch(action.type) {
    case GET_GREETING:
      return action.result.data.greetings;
    default:
      return state;
  }
}

module.exports = {
  greetings,
};
