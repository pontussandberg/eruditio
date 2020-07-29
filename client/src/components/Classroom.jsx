import React from 'react';
import VideoChat from './VideoChat.jsx';


const Classroom = ({ match: { params: { id } }, history }) => {

    const leaveRoom = () => history.push('/connections');

    return (
        <section className='flex flex-wrap justify-center'>
            <VideoChat
                id={id}
                leaveRoom={leaveRoom}
            />
        </section>
    );
};

export default Classroom;
