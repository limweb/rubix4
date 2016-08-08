import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import {
  Row,
  Col,
  Grid,
  Form,
  Alert,
  Button,
  Checkbox,
  FormGroup,
  FormControl } from '@sketchpixy/rubix';

export default class TodoForm extends React.Component {
  state = {
    errors: [],
  };

  createTodo(e) {
    e.preventDefault();

    let input = ReactDOM.findDOMNode(this.input);

    let todo = input.value;

    Meteor.call('todos.create', todo, (err, res) => {
      if (err) {
        this.setState({
          errors: [].concat(err),
        });
        return;
      }

      this.setState({ errors: [] });
    });

    input.value = '';
  }

  render() {
    let errors = this.state.errors.length ?
      (
        <Alert danger dismissible>
          {this.state.errors.map(({ message }, i) => {
            return <div key={i}>{message}</div>
          })}
        </Alert>
      ) : null;

    return (
      <div>
        {errors}

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

