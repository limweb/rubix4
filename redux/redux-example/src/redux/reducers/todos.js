import {
  ALL_TODOS,
  EDIT_TODO,
  REMOVE_TODO,
  SINGLE_TODO,
  CREATE_TODO,
} from '../actions/actionTypes';

function getIndexOfTodoItem(action, state) {
  let index = -1, data = action.result;

  for (let i = 0; i < state.result.length; i++) {
    if (state.result[i]._id === data._id) {
      index = i;
      break;
    }
  }

  return index;
}

function todos(state = [], action) {
  if (action.error) {
    return {
      result: state.result,
      error: action.error,
    };
  }

  switch(action.type) {
    case SINGLE_TODO:
    case ALL_TODOS:
      return {
        result: action.result
      };
    case CREATE_TODO:
      return {
        result: [
          ...state.result,
          action.result,
        ]
      };
    case EDIT_TODO:
      var index = getIndexOfTodoItem(action, state);

      // todo item not found in state object so return original state
      if (index === -1) return state;

      // todo item found! return new state
      return {
        result: [
          ...state.result.slice(0, index),
          Object.assign({}, state.result[index], action.result),
          ...state.result.slice(index + 1)
        ]
      };
    case REMOVE_TODO:
      var index = getIndexOfTodoItem(action, state);

      // todo item not found in state object so return original state
      if (index === -1) return state;

      // todo item found! don't include it in the new state
      return {
        result: [
          ...state.result.slice(0, index),
          ...state.result.slice(index + 1)
        ],
      };
    default:
      return state;
  }
}

module.exports = {
  todos,
};
