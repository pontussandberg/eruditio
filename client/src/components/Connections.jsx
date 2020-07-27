import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import ButtonLink from './buttons/ButtonLink.jsx';

/**
 * profile.requests
 * profile.connections
 */

const pending = x => console.log('pending', x) || <div key={x}>{x.name}</div>;

const Connections = ({ authenticated, profile }) => {
    if(!authenticated) return <Redirect to='/' />;
    if(!profile.hasProfile) return <Redirect to='/create-profile' />;

    const [ requests, setRequests ] = useState([]);

    useEffect(() => {
        fetch('/api/users/me/pending')
            .then(x => x.json())
            .then(console.log);
        // const list = profile.requests
        //     .filter(({ tutor }) => tutor === profile.shortId)
        //     .map(x => `/api/users/${x}`);
        // console.log('Requests', profile.requests);
        // Promise
        //     .all(list.map(x => fetch(x).then(x => x.json())))
        //     .then(x => console.log('useEffect', x) || x)
        //     .then(data => setRequests(data));
    }, []);

    return (
        <section>
            <ButtonLink text='Start the Lesson' path={`/room/${uuid()}`} />
            {requests.map(pending)}
        </section>
    );
};

export default Connections;
