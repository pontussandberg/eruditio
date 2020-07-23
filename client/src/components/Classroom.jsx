import React, { useRef, useEffect } from 'react';
import VideoChat from './VideoChat.jsx'


const Classroom = ({ match: { params: { id } } }) => {

    return (
        <VideoChat id={id} />
    );
};

export default Classroom;
