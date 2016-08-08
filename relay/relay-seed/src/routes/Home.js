import React from 'react';
import Relay from 'react-relay';

import {
  PanelContainer,
  Panel,
  PanelBody,
  Grid,
  Row,
  Col,
  Form,
  FormControl } from '@sketchpixy/rubix';

class Home extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{paddingTop: 0}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <h3>{this.props.user.greetings.hello}</h3>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}

const HomeContainer = Relay.createContainer(Home, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        greetings {
          hello
        }
      }
    `,
  }
})

export default HomeContainer;
