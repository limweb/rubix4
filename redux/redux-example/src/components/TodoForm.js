import React from 'react';
import ReactDOM from 'react-dom';

import {
  Row,
  Col,
  Grid,
  Form,
  Button,
  Checkbox,
  FormGroup,
  FormControl } from '@sketchpixy/rubix';

export default class TodoForm extends React.Component {
  createTodo(e) {
    e.preventDefault();

    let input = ReactDOM.findDOMNode(this.input);

    let todo = input.value;

    let { dispatch, actions } = this.props;

    dispatch(actions.createTodo({ todo }));

    input.value = '';
  }

  render() {
    return (
      <div>
        <Form horizontal onSubmit={::this.createTodo}>
          <FormGroup>
            <Col sm={10}>
              <FormControl type='text' placeholder='A todo item...' ref={(input) => this.input = input} autoFocus />
            </Col>
            <Col sm={2} collapseLeft>
              <br className='visible-xs' />
              <Button type='submit' bsStyle='blue' block onlyOnHover>Create Todo</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

