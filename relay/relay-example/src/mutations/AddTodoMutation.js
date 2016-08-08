import Relay from 'react-relay';

export default class AddTodoMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `
  }

  getMutation() {
    return Relay.QL`mutation { addTodo }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddTodoPayload {
        todoEdge,
        user {
          id
        },
        error
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'todos',
      edgeName: 'todoEdge',
      rangeBehaviors: {
        '': 'append',
        'status(any)': 'append',
        'status(completed)': null
      }
    }];
  }

  getVariables() {
    return {
      todo: this.props.todo,
    };
  }
}
