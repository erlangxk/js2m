import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';

import cors from 'cors';
import bodyParser from 'body-parser';
import {
  schema
} from './src/schema';

import {
  execute,
  subscribe
} from 'graphql';
import {
  createServer
} from 'http';
import {
  SubscriptionServer
} from 'subscriptions-transport-ws';
const PORT = 4000;
const server = express();

server.use('*', cors({
  origin: 'http://localhost:3000'
}));

server.get('/', function (req, res) {
  res.send('Hello World!');
});

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: 'ws://localhost:4000/subscriptions',
}));

const ws = createServer(server);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions'
  })
});




//server.listen(PORT, () => console.log(`GraphQL Server is now running on http://localhost:${PORT}`));