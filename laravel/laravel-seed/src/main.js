import React from 'react';
import ReactDOM from 'react-dom';

import routes from './routes';
import render, { setRoutes } from '@sketchpixy/rubix/lib/others/router';
import { isBrowser } from '@sketchpixy/rubix';

if (isBrowser()) {
  render(routes, () => {
    console.log('Completed rendering!');
  });

  if (module.hot) {
    module.hot.accept('./routes', () => {
      // reload routes again
      require('./routes').default;
      render(routes);
    });
  }
} else {
  // set routes for server-side rendering
  setRoutes(routes);
}
