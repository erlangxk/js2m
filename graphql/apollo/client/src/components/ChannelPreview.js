import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';

function ChannelPreview(){
    let channel={name:"Stub Name"}
    return (
        <div className="channelName">
            {channel.name}
        </div>
    );
}