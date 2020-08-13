import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Button from './buttons/Button';
import ConItem from './ConItem';
import ConnectionsNavLink from './buttons/ConnectionsNavLink';
import ScnBtnLink from './buttons/ScnBtnLink';
import Spinner from './Spinner';
import {
    cancelRequest,
    acceptRequest,
    declineRequest,
    createRoom,
    getRooms
} from '../lib/fetchers.js';
import { ConnectionList, ConnectionsProps, Room } from '../lib/interfaces';

type leaveFn = (arg: Response | string) => any

const getRoom = (tutorId: string, rooms: Room[]) => rooms.find(x => x.tutor === tutorId);

const contentActions = {
    connections: (data: ConnectionList | null, _: CallableFunction, leave: leaveFn): React.ReactElement[] => {
        if (data === null) return []

        const { connections, rooms } = data
        return connections.map(con => {
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
        })
    },
    outgoing: (data: ConnectionList | null, refresh: leaveFn): React.ReactElement[] => {
        if (data === null) return []

        return data.outgoing.map(con => (
            <ConItem key={con.shortId} con={con}>
                <Button
                    onClick={() => cancelRequest(con.shortId).then(refresh)}
                    text='Cancel'
                    classes='danger'
                />
                <ScnBtnLink text='View Profile' path={`/users/${con.shortId}`} />
            </ConItem>
        ))
    },
    incoming: (data: ConnectionList | null, refresh: leaveFn): React.ReactElement[] => {
        if (data === null) return []

        return data.incoming.map(con => (
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
        ))
    },
    default: (): void => {},
};

const Connections: React.FC<ConnectionsProps> = ({ authenticated, profile }) => {
    if(!authenticated) return <Redirect to='/' />;
    if(!profile.hasProfile) return <Redirect to='/create-profile' />;

    const [ page, setPage ] = useState<'connections' | 'outgoing' | 'incoming'>('connections');
    const [ data, setData ] = useState(null);
    const [ room, setRoom ] = useState<string | null | Response>(null);

    const goToRoom = (id: string | Response): void => setRoom(id);

    const getBtnClasses = (btnName: string) => btnName === page
        ? 'bg-white text-black'
        : 'text-white';

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
                <ConnectionsNavLink
                    onClick={() => setPage('connections')}
                    text={'Connections'}
                    classes={getBtnClasses('connections')} />
                <ConnectionsNavLink
                    onClick={() => setPage('outgoing')}
                    text={'Outgoing'}
                    classes={getBtnClasses('outgoing')}
                />

                {profile.role === 'tutor'
                && <ConnectionsNavLink
                    onClick={() => setPage('incoming')}
                    text={'Incoming'}
                    classes={getBtnClasses('incoming')}
                />}
            </nav>

            {createContent()}
        </section>
    );
};
export default Connections;
