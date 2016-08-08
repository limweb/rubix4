import Relay from 'react-relay';

export default class RemoveTodoMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        id,
      }
    `
  }

  getMutation() {
    return Relay.QL`mutation { removeTodo }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveTodoPayload {
        todoIdToBeDeleted,
        user {
          id
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'todos',
      deletedIDFieldName: 'todoIdToBeDeleted',
    }];
  }

  getVariables() {
    return {
      id: this.props.todo.id,
    };
  }
}
