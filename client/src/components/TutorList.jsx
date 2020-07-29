import React, { useState, useEffect } from 'react';
import ProfileSection from './ProfileSection.jsx';
import ScnBtnLink from './buttons/ScnBtnLink.jsx';
import Button from './buttons/Button.jsx';
import Spinner from './Spinner.jsx';
import { addRequest, acceptRequest, cancelRequest } from '../lib/fetchers.js';

const createList = (tutors, shortId, refresh) => (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8'>
        {tutors.map(mapTutor(shortId, refresh))}
    </section>
);

const isInObj = elem => obj => obj.tutor === elem || obj.student === elem;

const mapTutor = (shortId, refresh) => x => (
    <div className='shadow p-6 rounded flex justify-between' key={x.shortId} >
        <div className='flex flex-col'>
            <h2 className='text-2xl font-semibold'>{x.name} {x['last-name']}</h2>
            <ProfileSection title='Subjects' content={x.subjects} />
            <ProfileSection title='Languages' content={x.languages} />
        </div>
        <div className='flex flex-col'>
            {!shortId || x.shortId === shortId || x.connections.some(isInObj(shortId))
                ? null
                : x.requests.some(y => y.tutor === shortId)
                    ? <Button text='Accept' classes='veiw-button mb-4' onClick={() => acceptRequest(x.shortId).then(refresh)} />
                    : x.requests.some(y => y.student === shortId)
                        ? <Button text='Cancel' classes='danger mb-4' onClick={() => cancelRequest(x.shortId).then(refresh)} />
                        : <Button onClick={() =>
                            addRequest({ tutor: x.shortId, student: shortId }).then(refresh)} classes='view-button mb-4' text='Connect' />}
            <ScnBtnLink
                path={`/users/${x.shortId}`}
                classes='view-button'
                text='View profile'
            />
        </div>
    </div>
);

const TutorList = ({ shortId }) => {
    const [ list, setList ] = useState([]);

    const getList = () => fetch('/api/users/tutors')
        .then(res => res.json())
        .then(res => setList(res))
        .catch(console.error);

    useEffect(() => {
        getList();
    }, []);

    return list.length === 0
        ? <Spinner />
        : createList(list, shortId, getList);
};

export default TutorList;
