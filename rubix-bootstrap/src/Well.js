import React from 'react';
import classNames from 'classnames';
import BWell from 'react-bootstrap/lib/Well';

export default class Well extends React.Component {
  static propTypes = {
    sm: React.PropTypes.bool,
    lg: React.PropTypes.bool,
    noMargin: React.PropTypes.bool,
  };

  render() {
    let props = {...this.props};

    if (props.hasOwnProperty('sm')) {
      props.bsSize = 'sm';
      delete props.sm;
    }

    if (props.hasOwnProperty('lg')) {
      props.bsSize = 'lg'
      delete props.lg;
    }

    if (props.hasOwnProperty('noMargin')) {
      props.style = props.style || {};
      props.style.margin = 0;
    }

    return <BWell {...props} />;
  }
}
