import Relay from 'react-relay';

export default class UpdateTodoMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
        todo,
        completed
      }
    `
  };

  getMutation() {
    return Relay.QL`mutation { updateTodo }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateTodoPayload {
        todo {
          id,
          todo,
          completed
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id
      },
    }];
  }

  getVariables() {
    return {
      id: this.props.todo.id,
      todo: this.props.todoText || this.props.todo.todo,
      completed: this.props.completed,
    };
  }

  getOptimisticResponse() {
    return {
      todo: {
        id: this.props.todo.id,
        todo: this.props.todoText || this.props.todo.todo,
        completed: this.props.completed,
      }
    };
  }
}
