import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { withRouter } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import {
  Row,
  Col,
  Grid,
  Form,
  Panel,
  Alert,
  Button,
  Checkbox,
  PanelBody,
  FormGroup,
  FormControl,
  ControlLabel,
  PanelContainer } from '@sketchpixy/rubix';

import { Todos } from '../api/todos.js';

@withRouter
class EditTodoForm extends React.Component {
  state = {
    errors: []
  };

  editTodo(e) {
    e.preventDefault();

    let input = ReactDOM.findDOMNode(this.input);
    let todo = input.value;
    let completed = this.checkbox.checked;

    let { _id } = this.props.todo;

    Meteor.call('todos.update', _id, todo, completed, (err, n) => {
      if (err) {
        this.setState({
          errors: [ ].concat(err),
        });
        return;
      }

      this.setState({
        errors: []
      }, () => {
        this.props.router.push('/');
      });
    });
  }

  render() {
    let { todo, completed } = this.props.todo;

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

        <Form onSubmit={::this.editTodo}>
          <FormGroup controlId='todoText'>
            <ControlLabel>Todo Text</ControlLabel>
            <FormControl type='text' placeholder='A todo item...' defaultValue={todo} ref={(input) => this.input = input} autoFocus />
          </FormGroup>
          <FormGroup controlId='todoComplete'>
            <Checkbox inputRef={(checkbox) => { this.checkbox = checkbox; }} defaultChecked={completed} >
              Mark as Completed
            </Checkbox>
          </FormGroup>
          <FormGroup>
            <Button type='submit' bsStyle='blue' onlyOnHover>Update Todo</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}


class EditTodo extends React.Component {
  static propTypes = {
    todo: React.PropTypes.object,
  };

  render() {
    let { todo } = this.props;

    if (!todo) return null;

    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 0, paddingBottom: 25}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Editing Todo Item:</h3>

                  <EditTodoForm todo={todo} />
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}

export default createContainer(({ params }) => {
  let { id } = params;
  let _id = id;
  Meteor.subscribe('todo', _id);

  return {
    todo: Todos.find({ _id }).fetch()[0],
  };
}, EditTodo);
