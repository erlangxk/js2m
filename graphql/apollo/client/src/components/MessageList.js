import React from 'react'

import AddMessage from './AddMessage';

function MessageList({ messages }){
    return (
        <div className="messagesList">
            { messages.map(m=>
                (<div key={m.id} className={'message ' + (m.id<0 ?'optimistic':'')}>{m.text}</div>))
            }
            <AddMessage/>
        </div>
    );
}

export default MessageList;