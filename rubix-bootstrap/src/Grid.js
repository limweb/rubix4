import React from 'react';
import BGrid from 'react-bootstrap/lib/Grid';

export default class Grid extends React.Component {
  static propTypes = {
    fixed: React.PropTypes.bool,
  };

  render() {
    let fluid = true;

    if (this.props.fluid === false) {
      fluid = false;
    }

    if (this.props.fixed === true) {
      fluid = false;
    }

    let props = {
      ...this.props,
      fluid: fluid
    };

    return <BGrid {...props} />
  }
}
