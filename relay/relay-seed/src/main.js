import React from 'react';
import ReactDOM from 'react-dom';

import routes from './routes';
import render, { setNetworkLayer } from '@sketchpixy/rubix/lib/node/relay-router';

import GraphQLSettings from '../graphql.json';

let GraphQLEndpoint = GraphQLSettings.development.endpoint;

if (process.env.NODE_ENV === 'production') {
  GraphQLEndpoint = GraphQLSettings.production.endpoint;
}

setNetworkLayer(GraphQLEndpoint);

render(routes, () => {
  console.log('Completed rendering!');
});

if (module.hot) {
  module.hot.accept('./routes', () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('app-container'));
    // reload routes again
    render(require('./routes').default);
  });
}
