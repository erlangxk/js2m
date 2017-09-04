import React from 'react';
import {gql, graphql} from 'react-apollo';
import {channelsListQuery} from './ChannelsListWithData';

function AddChannel({mutate}){
    const handleKeyUp = (evt) => {
        if (evt.keyCode === 13) {
            mutate({
                variables: {name:evt.target.value},
                optimisticResponse:{
                    addChannel: {
                        name:evt.target.value,
                        id:Math.round(Math.random()*-10000),
                        __typename:'Channel',
                    },
                },
                update:(store,{ data: { addChannel } }) => {
                    const data=store.readQuery({query:channelsListQuery});
                    data.channels.push(addChannel);
                    store.writeQuery({ query:channelsListQuery,data });
                },
            }).then(res =>evt.target.value = '');
        }
    };
    return (<input type = "text" placeholder = "New Channel" onKeyUp = {handleKeyUp}/>);
}

const addChannelMutation = gql`
    mutation addChannel($name:String!){
        addChannel(name:$name){
            id
            name
        }
    }
`;

export const AddChannelWithMutation = graphql(addChannelMutation)(AddChannel);