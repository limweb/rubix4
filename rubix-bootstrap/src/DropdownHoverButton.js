import React from 'react';
import RDropdownButton from 'react-bootstrap/lib/DropdownButton';

import { DropdownHoverButtonHOC } from './DropdownButton';

@DropdownHoverButtonHOC
export default class DropdownHoverButton extends React.Component {
  render() {
    return (
      <RDropdownButton open={this.props.open}
                       onToggle={this.props.onToggle}
                       defaultOpen={this.props.defaultOpen}
                       {...this.props.buttonProps} />
    );
  }
}
