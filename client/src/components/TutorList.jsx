import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import TutorCard from './TutorCard';

const createList = (tutors, shortId, refresh) => (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8'>
        {tutors.map(mapTutor(shortId, refresh))}
    </section>
);

const mapTutor = (shortId, refresh) => x => (
    <TutorCard key={x.shortId} tutor={x} shortId={shortId} refresh={refresh} />
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
