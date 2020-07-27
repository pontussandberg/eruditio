import React, { useState, useEffect } from 'react';
import ProfileSection from './ProfileSection.jsx';
import ScnBtnLink from './buttons/ScnBtnLink.jsx';
import Button from './buttons/Button.jsx';

const createList = (tutors, shortId) => (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8'>
        {tutors.map(mapTutor(shortId))}
    </section>
);


const addRequest = (body) => {
    fetch('/api/users/request', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(body),
    });
};

const mapTutor = shortId => x => (
    <div className='shadow p-6 rounded flex justify-between' key={x.shortId} >
        <div className='flex flex-col'>
            <h2 className='text-2xl font-semibold'>{x.name} {x['last-name']}</h2>
            <ProfileSection title='Subjects' content={x.subjects} />
            <ProfileSection title='Languages' content={x.languages} />
        </div>
        <div className='flex flex-col'>
            {x.shortId !== shortId
            && !x.requests.includes(shortId)
            && !x.connections.includes(shortId)
            && <Button onClick={() => addRequest({ tutor: x.shortId, student: shortId })} classes='view-button mb-4' text='Connect' />}
            <ScnBtnLink path={`/users/${x.shortId}`} classes='view-button' text='View profile' />
        </div>
    </div>
);

const TutorList = ({ shortId }) => {
    const [ list, setList ] = useState([]);
    useEffect(() => {
        fetch('/api/users/tutors')
            .then(res => res.json())
            .then(res => setList(res))
            .catch(console.error);
    }, []);


    return (
        list.length === 0 ? <p> is loading...</p> : createList(list, shortId)
    );
};

export default TutorList;
