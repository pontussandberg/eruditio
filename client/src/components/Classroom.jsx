import React, { useState } from 'react';
import VideoChat from './VideoChat.jsx';


const Classroom = ({ match: { params: { id } } }) => {
    const [ video, setVideo ] = useState(true);
    return (
        <section className='flex flex-wrap justify-center'>
            {video && <VideoChat id={id} onRemoveVideo={() => setVideo(false)} />}
        </section>
        //whiteboard
        //textchat
    );
};

export default Classroom;
