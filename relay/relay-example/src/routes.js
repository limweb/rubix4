import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';

import { Grid, Row, Col, MainContainer } from '@sketchpixy/rubix';

import Footer from './common/footer';
import Header from './common/header';
import Sidebar from './common/sidebar';

import UserQuery from './common/UserQuery';

import AllTodos from './routes/AllTodos';
import EditTodo from './routes/EditTodo';

class App extends React.Component {
  render() {
    return (
      <MainContainer {...this.props}>
        <Sidebar />
        <Header />
        <div id='body'>
          <Grid>
            <Row>
              <Col xs={12}>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </MainContainer>
    );
  }
}

export default (
  <Route path='/' component={App}>
    <IndexRoute component={AllTodos} queries={UserQuery} />
    <Route path='todo/edit/:id' component={EditTodo} queries={UserQuery} />
  </Route>
);
