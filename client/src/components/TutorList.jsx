import React, { useState, useEffect } from 'react';

const createList = (tutors) => (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
        {tutors.map(mapTutor)}
    </ul>
);
const mapTutor = (x) => (
    <li key={x.id} >{x.name}</li>
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
