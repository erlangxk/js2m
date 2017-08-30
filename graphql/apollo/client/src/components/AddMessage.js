import React from 'react';
import { withRouter } from 'react-router';

function AddMessage({ match }){
    function handleKeyUp(evt){
        if(evt.keyCode === 13){
            evt.target.value = '';
        }
    }
    return (
        <div className="messageInput">
            <input type="text" placeholder="New Message" onKeyUp={handleKeyUp}/>
        </div>
    );
}

export default withRouter(AddMessage);