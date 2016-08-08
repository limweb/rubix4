import React from 'react';
import ReactDOM from 'react-dom';

import { withRouter } from 'react-router';

import {
  Row,
  Col,
  Grid,
  Form,
  Panel,
  Button,
  Checkbox,
  PanelBody,
  FormGroup,
  FormControl,
  ControlLabel,
  PanelContainer } from '@sketchpixy/rubix';

import client from '@sketchpixy/rubix/lib/utils/HttpClient';

@withRouter
class EditTodoForm extends React.Component {
  editTodo(e) {
    e.preventDefault();

    let input = ReactDOM.findDOMNode(this.input);
    let todo = input.value;
    let completed = this.checkbox.checked ? 1 : 0;

    client.put(`/api/todos/${this.props.todo.id}`, {
      todo,
      completed,
    }).then((result) => {
      this.props.router.push('/');
    });
  }

  componentWillReceiveProps(newProps) {
    let input = ReactDOM.findDOMNode(this.input);
    input.value = newProps.todo.todo;
    this.checkbox.checked = newProps.todo.completed;
  }

  render() {
    let { todo, completed } = this.props.todo;

    return (
      <div>
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

export default class EditTodo extends React.Component {
  static fetchData(props) {
    let { params } = props.routerProps;
    let { id } = params;

    return client.get(`/api/todos/${id}`);
  }

  render() {
    let { todo } = this.props.data;

    let editForm = todo ? (
      <EditTodoForm todo={todo} />
    ) : null;

    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 0, paddingBottom: 25}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Editing Todo Item:</h3>

                  {editForm}
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}
