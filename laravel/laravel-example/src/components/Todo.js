import React from 'react';
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

import client from '@sketchpixy/rubix/lib/utils/HttpClient';

@withRouter
export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    let { todo } = props;

    this.state = {
      deleted: false,
      todo: todo.todo,
      completed: parseInt(todo.completed),
    };
  }

  toggleCompletion() {
    let completed = this.input.checked ? 1 : 0;
    client.put(`/api/todos/${this.props.todo.id}`, {
      completed,
    }).then((result) => {
      this.setState({
        todo: result.data.todo.todo,
        completed: parseInt(result.data.todo.completed),
      });
    });
  }

  removeTodo() {
    client.delete(`/api/todos/${this.props.todo.id}`)
          .then(() => {
             this.setState({ deleted: true });
          });
  }

  editTodo() {
    this.props.router.push(`/todos/${this.props.todo.id}`);
  }

  render() {
    if (this.state.deleted) return null;

    let { todo, completed } = this.state;
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
