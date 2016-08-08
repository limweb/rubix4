import React from 'react';
import classnames from 'classnames';
import BMenuItem from 'react-bootstrap/lib/MenuItem';

export default class MenuItem extends React.Component {
  render() {
    if (this.props.noHover) {
      return (
        <li role='presentation' { ...this.props } />
      );
    }

    return <BMenuItem { ...this.props } />;
  }
}
