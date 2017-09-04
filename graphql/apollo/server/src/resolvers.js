const channels = [{
    id: '1',
    name: 'baseball',
    messages:[{
        id:'2',
        text:'base ball is life',
    }],
}];

let nextId = 3;
let nextMessageId = 3;

export const resolvers = {
    Query: {
        channels: () => {
            return channels;
        },
        channel:(root, {id}) =>{
            return channels.find(c=>c.id == id);
        },
    },

    Mutation: {
        addChannel: (root, args) => {
            const newChannel = {
                id: String(nextId++),
                name: args.name,
                messages:[],
            };
            channels.push(newChannel);
            return newChannel;
        },

        addMessage:(root,{message})=>{
            const channel=channels.find(c=>c.id == message.channelId);
            if(!channel){
                throw new Error("Channel does not exist");
            }
            const newMessage={
                id:String(nextMessageId++),
                text:message.text,
            };
            channel.messages.push(newMessage);
            return newMessage;
        },
    },
};