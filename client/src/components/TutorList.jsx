import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileSection from './ProfileSection.jsx';
import Button from './buttons/Button.jsx';

const createList = (tutors) => (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {tutors.map(mapTutor)}
    </section>
);
const mapTutor = (x) => (
    <div className='shadow p-6 rounded' key={x.id} >
        <div className='flex justify-between'>
            <h2 className='text-2xl font-semibold'>{x.name} {x['last-name']}</h2>
            <Button path={`/users/${x.shortId}`} classes='ml-2 view-button' text='View profile' />
        </div>
        <ProfileSection title='Subjects' content={x.subjects} />
        <ProfileSection title='Languages' content={x.languages} />
    </div>
);

const TutorList = () => {
    const [ list, setList ] = useState([]);
    useEffect(() => {
        fetch('/api/users/tutors')
            .then(res => res.json())
            .then(res => setList(res))
            .catch(console.error);
    }, []);


    return (
        list.length === 0 ? <p> is loading...</p> : createList(list)
    );
};

export default TutorList;
