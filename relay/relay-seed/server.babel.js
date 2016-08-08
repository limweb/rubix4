import path from 'path';
import express from 'express';
import graphQLHTTP from 'express-graphql';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import routes from './src/routes';
import { renderHTMLString, setNetworkLayer } from '@sketchpixy/rubix/lib/node/relay-router';
import RubixAssetMiddleware from '@sketchpixy/rubix/lib/node/RubixAssetMiddleware';
import schema from './data/schema.js';

import GraphQLSettings from './graphql.json';

let GraphQLEndpoint = GraphQLSettings.development.endpoint;

if (process.env.NODE_ENV === 'production') {
  GraphQLEndpoint = GraphQLSettings.production.endpoint;
}

setNetworkLayer(GraphQLEndpoint);

const port = process.env.PORT || 8080;

let app = express();
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('views', path.join(process.cwd(), 'views'));
app.set('view engine', 'pug');

app.use('/graphql', graphQLHTTP({schema, pretty: true}));

app.get('/graphiql', (req, res, next) => {
  res.render('graphiql');
});

function renderHTML(req, res) {
  renderHTMLString(routes, req, (error, redirectLocation, data) => {
    if (error) {
      if (error.message === 'Not found') {
        res.status(404).send(error.message);
      } else {
        res.status(500).send(error.message);
      }
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else {
      res.render('index', {
        content: data.content,
        data: JSON.stringify(data.data).replace(/\//g, '\\/')
      });
    }
  });
}

app.get('*', RubixAssetMiddleware('ltr'), (req, res, next) => {
  renderHTML(req, res);
});

app.listen(port, () => {
  console.log(`Node.js app is running at http://localhost:${port}/`);
});
