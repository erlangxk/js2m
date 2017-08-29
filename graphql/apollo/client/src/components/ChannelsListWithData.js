import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

import { AddChannelWithMutation } from './AddChannel';

function ChannelList({data: {loading,error,channels}}){
  if(loading){
    return <p>Loading</p>;
  }
  if(error){
    return <p>{error.message}</p>;
  }
  return (
      <div className="channelsList">
          <AddChannelWithMutation/>
         {channels.map(ch => <div className={'channel '+(ch.id < 0 ? 'optimistic': '')} key={ch.id}>{ch.name}</div>)}
      </div>
  );
}

export const channelsListQuery=gql`query ChannelsListQuery { 
  channels {
    id 
    name
  }
}`;

export const ChannelsListWithData=graphql(channelsListQuery)(ChannelList);