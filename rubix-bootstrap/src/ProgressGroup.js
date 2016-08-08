import React from 'react';

export default class ProgressGroup extends React.Component {
  render() {
    return (
      <div className='progress'>
        {this.props.children}
      </div>
    );
  }
}
