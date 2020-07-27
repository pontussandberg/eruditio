import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Button from './buttons/Button.jsx';
import ButtonLink from './buttons/ButtonLink.jsx';
import ConItem from './conItem.jsx';
import ConnectionsNavLink from './buttons/ConnectionsNavLink.jsx';
import ScnBtnLink from './buttons/ScnBtnLink.jsx';

const contentActions = {
    connections: ({ connections }) => connections.map(con => (
        <ConItem key={con.shortId} con={con}>
            <ButtonLink text='View Profile' path={`/users/${con.shortId}`} />
        </ConItem>
    )),
    outgoing: ({ outgoing }) => outgoing.map(con => (
        <ConItem key={con.shortId} con={con}>
            <Button onClick={() => console.log('Cancelled')} text='Cancel' classes='danger' />
            <ScnBtnLink text='View Profile' path={`/users/${con.shortId}`} />
        </ConItem>
    )),
    incoming: ({ incoming }) => incoming.map(con => (
        <ConItem key={con.shortId} con={con}>
            <Button onClick={() => console.log('Declined')} text='Decline' classes='danger' />
            <Button onClick={() => console.log('Accepted')} text='Accept' />
            <ScnBtnLink text='View Profile' path={`/users/${con.shortId}`} />
        </ConItem>
    )),
    default: () => {},
};

const Connections = ({ authenticated, profile }) => {
    if(!authenticated) return <Redirect to='/' />;
    if(!profile.hasProfile) return <Redirect to='/create-profile' />;

    const [ page, setPage ] = useState('connections');
    const [ data, setData ] = useState(null);

    const getBtnClasses = btnName => {
        return btnName === page ? 'bg-white text-black' : 'text-white';
    };

    const createContent = () => {
        const action = contentActions[page] || contentActions.default;
        return (
            <div>
                {action(data)}
            </div>
        );
    };

    useEffect(() => {
        Promise.all([
            fetch('/api/users/me/pending').then(x => x.json()),
            fetch('/api/users/me/connections').then(x => x.json()),
        ])
            .then(([ pending, connections ]) => ({ ...pending, connections }))
            .then(x => setData(x));
    }, []);
    if (data === null) return null;
    return (
        <section className='border-2 border-blue-600 lg:mx-32 md:mx-20'>
            <nav className='bg-blue-600 flex justify-between'>
                <ConnectionsNavLink onClick={() => setPage('connections')} text={'Connections'} classes={getBtnClasses('connections')} />
                <ConnectionsNavLink onClick={() => setPage('outgoing')} text={'Outgoing'} classes={getBtnClasses('outgoing')} />

                {profile.role === 'tutor'
                && <ConnectionsNavLink onClick={() => setPage('incoming')} text={'Incoming'} classes={getBtnClasses('incoming')} />}
            </nav>

            {createContent()}
        </section>
    );
};

export default Connections;
