import React from 'react';
import BProgressBar from './BProgressBar';

export default class ProgressBar extends React.Component {
  static propTypes = {
    value: React.PropTypes.number
  };

  render() {
    let props = { ...this.props };

    if (props.value) {
      props.now = props.value;
      delete props.value;
    }

    return <BProgressBar {...props} />;
  }
}
