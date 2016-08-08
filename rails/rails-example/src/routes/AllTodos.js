import React from 'react';

import { Link } from 'react-router';

import Todo from '../components/Todo';
import TodoForm from '../components/TodoForm';

import client from '@sketchpixy/rubix/lib/utils/HttpClient';

import {
  Row,
  Col,
  Grid,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

export default class Home extends React.Component {
  static fetchData() {
    return client.get('/todos');
  }

  constructor(props) {
    super(props);

    this.state = {
      todos: props.data.todos,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      todos: nextProps.data.todos,
    });
  }

  addTodo(todo) {
    let todos = this.state.todos.concat();
    todos.push(todo);
    this.setState({
      todos: todos,
    });
  }

  render() {
    let { todos } = this.state;

    let todosExist = todos && typeof todos.map === 'function';

    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 0, paddingBottom: 25}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Todo List:</h3>

                  <TodoForm parent={this} />

                  {todosExist && todos.map((todo) => {
                    return <Todo key={todo.id} todo={todo} />;
                  })}
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}
