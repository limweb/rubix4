import React from 'react';
import ReactDOM from 'react-dom';

import client from '@sketchpixy/rubix/lib/utils/HttpClient';

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
    errors: {},
  };

  createTodo(e) {
    e.preventDefault();

    let input = ReactDOM.findDOMNode(this.input);

    let todo = input.value;

    client.post(`/api/todos`, {
      todo,
      completed: 0,
    }).then((result) => {
      if (result.data.hasOwnProperty('errors')) {
        this.setState({ errors: result.data.errors });
        return;
      }

      this.props.parent.addTodo(result.data.todo);

      this.setState({ errors: {} });
    });

    input.value = '';
  }

  render() {
    let { errors } = this.state;
    let errorKeys = Object.keys(errors);

    errors = errorKeys.length ?
      (
        <Alert danger dismissible>
          {errorKeys.map((field, i) => {
            return (
              <div key={i}>
                <div><strong>{field}:</strong></div>
                <ul>
                  {errors[field].map((error, j) => {
                    return <li key={j}>{error}</li>
                  })}
                </ul>
              </div>
            );
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
