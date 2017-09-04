import React from 'react';
import MessageList from './MessageList';
import ChannelPreview from './ChannelPreview';
import NotFound from './NotFound';

import {
    gql,
    graphql,
} from 'react-apollo';

export const channelDetailsQuery=gql`
    query ChannelDetailsQuery($channelId:ID!){
        channel(id:$channelId){
            id
            name
            messages {
                id
                text
            }
        }
    }
`;

const messageSubscription = gql`
    subscription messageAdded($channelId:ID!){
        messageAdded(channelId:$channelId){
            id
            text
        }
    }
`;

class ChannelDetails extends React.Component{
    componentWillMount(){
       this.props.data.subscribeToMore({
           document:messageSubscription,
           variables:{
               channelId:this.props.match.params.channelId,
           },
           updateQuery:(prev,{subscriptionData})=>{
               if(!subscriptionData.data){
                   return prev;
               }
               const newMessage=subscriptionData.data.messageAdded;
               if(!prev.channel.messages.find((msg)=>msg.id === newMessage.id)){
                   return Object.assign({},prev,{
                       channel:Object.assign({},prev.channel,{
                           messages:[...prev.channel.messages, newMessage],
                       }),
                   });
               }else{
                   return prev;
               }
           },
       });
    }

    render(){
        const {data:{loading,error,channel},match}=this.props;
        
        if(loading){
            return <ChannelPreview channelId={match.params.channelId}/>
        }
        if(error){
            return <p>{error.message}</p>;
        }
        if(channel===null){
            return <NotFound/>
        }
        return (
            <div>
                <div className = "channelName">
                    {channel.name}
                </div>
                <MessageList messages={channel.messages}/>
            </div>
        );
    }
}

const ChannelDetailsWithData = graphql(channelDetailsQuery,{
    options:(props) => ({
        variables: {
            channelId:props.match.params.channelId
        },
    }),
})(ChannelDetails)

export default ChannelDetailsWithData;