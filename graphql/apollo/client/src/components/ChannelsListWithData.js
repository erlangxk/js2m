import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

function ChannelList({data: {loading,error,channels}}){
  if(loading){
    return <p>Loading</p>;
  }
  if(error){
    return <p>{error.message}</p>;
  }
  return (
    <ul>
         {channels.map(ch => <li key={ch.id}>{ch.name}</li>)}
    </ul>
  );
}

const channelsListQuery=gql`query ChannelsListQuery { 
  channels {
    id 
    name
  }
}`;

export const ChannelsListWithData=graphql(channelsListQuery)(ChannelList);