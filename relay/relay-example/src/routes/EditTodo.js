import React from 'react';
import Relay from 'react-relay';
import ReactDOM from 'react-dom';

import { withRouter } from 'react-router';

import {
  Row,
  Col,
  Grid,
  Form,
  Alert,
  Panel,
  Button,
  Checkbox,
  PanelBody,
  FormGroup,
  FormControl,
  ControlLabel,
  PanelContainer } from '@sketchpixy/rubix';

import UpdateTodoMutation from '../mutations/UpdateTodoMutation';

@withRouter
class EditTodoForm extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  state = {
    errors: []
  };

  editTodo(e) {
    e.preventDefault();

    let input = ReactDOM.findDOMNode(this.input);
    let todo = input.value;
    let completed = this.checkbox.checked;

    this.context.relay.commitUpdate(
      new UpdateTodoMutation({
        user: this.props.user,
        todo: this.props.user.getTodo,
        todoText: todo,
        completed: completed
      }), {
      onSuccess: () => {
        this.setState({
          errors: []
        });

        this.props.router.push('/');
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

    let user = this.props.user;
    let getTodo = user.getTodo;

    let { todo, completed } = getTodo;

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
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{padding: 0, paddingBottom: 25}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>Editing Todo Item:</h3>
                  <EditTodoForm relay={this.context.relay} user={this.props.user} />
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}

const EditTodoContainer = Relay.createContainer(EditTodo, {
  initialVariables: {
    id: null,
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        getTodo(id: $id) {
          id,
          todo,
          completed,
          ${UpdateTodoMutation.getFragment('todo')},
        }
      }
    `,
  }
});

export default EditTodoContainer;
