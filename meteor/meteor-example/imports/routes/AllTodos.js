import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import {
  Row,
  Col,
  Grid,
  Panel,
  Alert,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

import { Todos } from '../api/todos.js';

import Todo from '../components/Todo';
import TodoForm from '../components/TodoForm';

class AllTodos extends React.Component {
  static propTypes = {
    todos: React.PropTypes.array.isRequired,
  };

  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 0, paddingBottom: 25}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Todo List:</h3>

                  <TodoForm />

                  {this.props.todos.map((todo) => {
                    return <Todo key={todo._id} todo={todo} />;
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

export default createContainer(() => {
  Meteor.subscribe('todos');

  const todos = Todos.find({}).fetch() || [];

  return {
    todos: todos,
  };
}, AllTodos);
