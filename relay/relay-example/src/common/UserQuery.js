import Relay from 'react-relay';

const UserQuery = {
  user: (Component, variables) => Relay.QL`
    query {
      user {
        ${Component.getFragment('user', {...variables})}
      }
    }
  `,
};

export default UserQuery;
