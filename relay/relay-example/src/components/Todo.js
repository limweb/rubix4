import React from 'react';
import Relay from 'react-relay';
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

import UpdateTodoMutation from '../mutations/UpdateTodoMutation';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';

@withRouter
class Todo extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  toggleCompletion() {
    this.context.relay.commitUpdate(
      new UpdateTodoMutation({
        todo: this.props.todo,
        completed: this.input.checked
      })
    );
  }

  removeTodo() {
    this.context.relay.commitUpdate(
      new RemoveTodoMutation({
        todo: this.props.todo,
        user: this.props.user
      })
    );
  }

  editTodo() {
    this.props.router.push(`/todo/edit/${this.props.todo.id}`);
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

const TodoContainer = Relay.createContainer(Todo, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        id,
        todo,
        completed,
        ${UpdateTodoMutation.getFragment('todo')},
        ${RemoveTodoMutation.getFragment('todo')}
      }
    `
  }
});

export default TodoContainer;
