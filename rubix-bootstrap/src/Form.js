import React from 'react';
import BForm from 'react-bootstrap/lib/Form';
import FormGroup from './FormGroup';
import FormControl from './FormControl';

export default class Form extends React.Component {
  static propTypes = {
    allowAutoComplete: React.PropTypes.bool,
  };

  static defaultProps = {
    allowAutoComplete: false,
  };

  render() {
    let props = { ...this.props };

    if (!props.allowAutoComplete) {
      return (
        <BForm {...props} children={null} allowAutoComplete={null} autoComplete="off">
          <div style={{height: 0, visibility: 'hidden'}}>
            <FormGroup>
              <FormControl type='text' />
            </FormGroup>
            <FormGroup>
              <FormControl type='email' />
            </FormGroup>
            <FormGroup>
              <FormControl type='password' />
            </FormGroup>
          </div>
          {this.props.children}
        </BForm>
      );
    }

    return <BForm {...props} />;
  }
}
