import React from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Button from './buttons/Button.jsx';

const Connections = ({ authenticated, profile }) => {


    if(!authenticated) return <Redirect to='/' />;
    if(!profile.hasProfile) return <Redirect to='/create-profile' />;

    return (
        <section>
            <Button text='Start the Lesson' path={`/room/${uuid()}`} />
        </section>
    );
};

export default Connections;
