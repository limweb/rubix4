import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router';

import {
  Col,
  Row,
  Grid,
  Icon,
  Button,
  Checkbox,
  ButtonGroup,
} from '@sketchpixy/rubix';

@withRouter
export default class Todo extends React.Component {
  toggleCompletion() {
    let { _id } = this.props.todo;
    let completed = this.input.checked;

    Meteor.call('todos.setChecked', _id, completed);
  }

  removeTodo() {
    let { _id } = this.props.todo;

    Meteor.call('todos.remove', _id);
  }

  editTodo() {
    this.props.router.push(`/todo/edit/${this.props.todo._id}`);
  }

  render() {
    let { todo, completed } = this.props.todo;
    let style = {
      textDecoration: completed ? 'line-through' : null
    };

    return (
      <Grid>
        <Row className='todo-item'>
          <Col sm={8}>
            <Checkbox onChange={::this.toggleCompletion} style={style} inputRef={(input) => { this.input = input; }} checked={completed} >
              {todo}
            </Checkbox>
          </Col>
          <Col sm={4} className='text-right'>
            <Button bsStyle='red' className='remove-sm' onClick={::this.removeTodo} style={{marginRight: 12.5}}>Remove</Button>
            <Button bsStyle='green' className='remove-sm' onlyOnHover onClick={::this.editTodo}>Edit</Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

