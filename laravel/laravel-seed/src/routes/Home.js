import React from 'react';

import { Link } from 'react-router';

import {
  Row,
  Col,
  Grid,
  Panel,
  PanelBody,
  PanelContainer,
} from '@sketchpixy/rubix';

export default class Home extends React.Component {
  render() {
    return (
      <PanelContainer>
        <Panel>
          <PanelBody style={{paddingTop: 12.5}}>
            <Grid>
              <Row>
                <Col xs={12}>
                  <p>Hello, World!</p>
                </Col>
              </Row>
            </Grid>
          </PanelBody>
        </Panel>
      </PanelContainer>
    );
  }
}
