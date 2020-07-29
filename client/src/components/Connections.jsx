import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from './buttons/Button.jsx';
import ConItem from './ConItem.jsx';
import ConnectionsNavLink from './buttons/ConnectionsNavLink.jsx';
import ScnBtnLink from './buttons/ScnBtnLink.jsx';
import Spinner from './Spinner.jsx';
import {
    cancelRequest,
    acceptRequest,
    declineRequest,
    createRoom,
    getRooms
} from '../lib/fetchers.js';

const getRoom = (tutorId, rooms) => rooms.find(x => x.tutor === tutorId);

const contentActions = {
    connections: ({ connections, rooms }, _, leave) => connections.map(con => {
        const room = getRoom(con.shortId, rooms);
        const button = con.relation === 'student'
            ? <Button
                text='Call'
                onClick={() => createRoom({ student: con.shortId }).then(leave)}
                classes='green px-6'
            />
            : room
                ? <Button
                    text='Join Call'
                    onClick={() => leave(room.id)}
                    classes='green px-6'
                />
                : <div></div>;

        return (
            <ConItem key={con.shortId} con={con}>
                {button}
                <ScnBtnLink text='View Profile' path={`/users/${con.shortId}`} />
            </ConItem>
        );
    }),
    outgoing: ({ outgoing }, refresh) => outgoing.map(con => (
        <ConItem key={con.shortId} con={con}>
            <Button
                onClick={() => cancelRequest(con.shortId).then(refresh)}
                text='Cancel'
                classes='danger'
            />
            <ScnBtnLink text='View Profile' path={`/users/${con.shortId}`} />
        </ConItem>
    )),
    incoming: ({ incoming }, refresh) => incoming.map(con => (
        <ConItem key={con.shortId} con={con}>
            <Button
                onClick={() => declineRequest(con.shortId).then(refresh)}
                text='Decline'
                classes='danger'
            />
            <Button
                onClick={() => acceptRequest(con.shortId).then(refresh)}
                text='Accept'
            />
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
    const [ room, setRoom ] = useState(null);

    const goToRoom = id => setRoom(id);

    const getBtnClasses = btnName => {
        return btnName === page ? 'bg-white text-black' : 'text-white';
    };

    const createContent = () => {
        const action = contentActions[page] || contentActions.default;
        const content = action(data, getCons, goToRoom);
        const display = content.length > 0
            ? content
            : <p className='p-16 text-gray-700'>Nothing to display...</p>;

        return (
            <div>
                {display}
            </div>
        );
    };

    const getCons = () => Promise.all([
        fetch('/api/users/me/pending').then(x => x.json()),
        fetch('/api/users/me/connections').then(x => x.json()),
        getRooms(),
    ])
        .then(([ pending, connections, rooms ]) => ({
            ...pending,
            connections,
            rooms,
        }))
        .then(x => setData(x));

    useEffect(() => {
        getCons();
    }, []);

    if (room) return <Redirect to={`/room/${room}`} />;
    if (data === null) return <Spinner />;

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
