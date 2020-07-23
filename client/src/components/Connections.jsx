import React from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import ButtonLink from './buttons/ButtonLink.jsx';

const Connections = ({ authenticated, profile }) => {


    if(!authenticated) return <Redirect to='/' />;
    if(!profile.hasProfile) return <Redirect to='/create-profile' />;

    return (
        <section>
            <ButtonLink text='Start the Lesson' path={`/room/${uuid()}`} />
        </section>
    );
};

export default Connections;
