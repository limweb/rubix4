import React from 'react';
import classNames from 'classnames';

export default class AlertLink extends React.Component {
  render() {
    let props = { ...this.props };
    props.className = classNames('alert-link', props.className);

    return (
      <a {...props} />
    );
  }
}
