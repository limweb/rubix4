import React from 'react';
import classNames from 'classnames';

import BModalDialog from 'react-bootstrap/lib/ModalDialog';

export default class ModalDialog extends React.Component {
  static propTypes = {
    sm: React.PropTypes.bool,
    lg: React.PropTypes.bool,
  };

  render() {
    let props = {...this.props};

    if (props.sm) {
      props.bsSize = 'small';
      delete props.sm;
    }

    if (props.lg) {
      props.bsSize = 'large';
      delete props.lg;
    }

    return <BModalDialog {...props} />;
  }
}
