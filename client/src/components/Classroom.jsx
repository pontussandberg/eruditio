import React, { useState } from 'react';
import VideoChat from './VideoChat.jsx';


const Classroom = ({ match: { params: { id } }, history }) => {
    const [ video, setVideo ] = useState(true);

    const leaveRoom = () => history.push('/connections');

    return (
        <section className='flex flex-wrap justify-center'>
            {video && <VideoChat
                id={id}
                leaveRoom={leaveRoom}
            />}
        </section>
        //whiteboard
        //textchat
    );
};

export default Classroom;
