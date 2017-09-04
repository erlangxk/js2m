import React, { Component } from 'react';

import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';
import { ChannelsListWithData } from './components/ChannelsListWithData';
import ChannelDetails from './components/ChannelDetails';
import NotFound from './components/NotFound';

import {
  ApolloClient, 
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri:'http://localhost:4000/graphql',
});

networkInterface.use([{
  applyMiddleware(req,next){
    setTimeout(next,1000);
  },
}]);

function dataIdFromObject(result){
  if(result.__typename && result.id !==undefined){
      return `${result.__typename}:${result.id}`;
  }
  return null;
}

const client=new ApolloClient({
  networkInterface,
  dataIdFromObject,
  customResolvers:{
    Query:{
      channel:(_,args)=>{
        return toIdValue(dataIdFromObject({
          __typename:'Channel',
          id:args['id']}));
      },
    },
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
        <div className="App">
          <Link to="/" className="navbar"> React + GraphQL Tutorial</Link>
          <Switch>
            <Route exact path="/" component={ChannelsListWithData} />
            <Route path="/channel/:channelId" component={ChannelDetails}/>
            <Route component={NotFound} />
            <ChannelsListWithData />
          </Switch>
        </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}
export default App;