import React, { Component } from 'react';
import './App.css';
import { ChannelsListWithData } from './components/ChannelsListWithData';
import {
  ApolloClient, 
  ApolloProvider
} from 'react-apollo';

import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';

import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

const schema=makeExecutableSchema({typeDefs});
addMockFunctionsToSchema({schema});

const mockNetworkInterface=mockNetworkInterfaceWithSchema({schema});

const client=new ApolloClient({networkInterface:mockNetworkInterface});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <div className="navbar"> React + GraphQL Tutorial</div>
       <ChannelsListWithData />
      </div>
      </ApolloProvider>
    );
  }
}

export default App;