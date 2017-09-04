import React from 'react';
import { withRouter } from 'react-router';
import {gql, graphql} from 'react-apollo';
import {channelDetailsQuery} from './ChannelDetails';

const addMessageMutation=gql`
    mutation addMessage($message:MessageInput!){
        addMessage(message:$message){
            id
            text
        }
    }
`;

function AddMessage({mutate, match }){
    function handleKeyUp(evt){
        if(evt.keyCode === 13){
            mutate({
                variables:{
                    message: {
                        channelId:match.params.channelId,
                        text:evt.target.value,
                    }
                },
                optimisticResponse:{
                    addMessage:{
                        text:evt.target.value,
                        id: Math.round(Math.random()* -1000000),
                        __typename:'Message',
                    }
                },
                update:function(store, { data: { addMessage } }){
                    const data=store.readQuery({
                        query:channelDetailsQuery,
                        variables:{
                            channelId:match.params.channelId,
                        }
                    });
                    data.channel.messages.push(addMessage);
                    store.writeQuery({
                        query:channelDetailsQuery,
                        variables:{
                            channelId:match.params.channelId,
                        },
                        data,
                    });
                },
            });
            evt.target.value = '';
        }
    }
    return (
        <div className="messageInput">
            <input type="text" placeholder="New Message" onKeyUp={handleKeyUp}/>
        </div>
    );
}

const AddMessageMutation=graphql(addMessageMutation)(withRouter(AddMessage));
export default AddMessageMutation;