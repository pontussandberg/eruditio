import React from 'react';
import io from 'socket.io-client';

const socket = io.connect();
socket.emit('message', 'Hi')

const ChatRoom = (props) => {

    return (
        <div>
            Whatever I want
        </div>
    );
}

export default ChatRoom;