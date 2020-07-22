import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const CreateRoom = () => {
    return (
        <Link to={`/room/${uuid()}`} > Text goes here </Link>
    );
};

export default CreateRoom;
