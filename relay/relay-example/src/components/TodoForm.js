import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

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

import AddTodoMutation from '../mutations/AddTodoMutation';

export default class TodoForm extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  state = {
    errors: [],
  };

  createTodo(e) {
    e.preventDefault();

    let input = ReactDOM.findDOMNode(this.input);

    let todo = input.value;

    this.context.relay.commitUpdate(
      new AddTodoMutation({
        todo,
        user: this.props.user
      })
    , {
      onSuccess: () => {
        this.setState({
          errors: []
        });
      },
      onFailure: (transaction) => {
        let error = transaction.getError();
        let source = error.source;
        let message = error.message;
        if (source) {
          source = source.errors[0].message;

          this.setState({
            errors: source.split('\n')
          });
        } else {
          this.setState({
            errors: [message]
          })
        }
      }
    });

    input.value = '';
  }

  render() {
    let errors = this.state.errors.length ?
      (
        <Alert danger dismissible>
          {this.state.errors.map((error, i) => {
            return <div key={i}>{error}</div>
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
