import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { Profile, UserPageProps } from '../lib/interfaces';

const UserPage: React.FC<UserPageProps> = ({ match: { params: { id } } }) => {
    const [ user, setUser ] = useState<Profile | null>(null);

    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(user => setUser(user))
            .catch(console.error);
    }, []);

    if (!user) return <Spinner />;

    const {
        'last-name': lastname,
        name,
        timezone,
        languages,
        contact,
        role,
        subjects,
        about,
    } = user;

    return (
        <section className='shadow p-6 rounded'>
            <h2 className='text-xl font-semibold text-blue-600'>{name} {lastname}</h2>
            <h3 className='font-semibold'>{role}</h3>
            <p className='text-xs'>{timezone}</p>
            <div>
                <h3 className='text-m font-semibold mt-4'>Speaks</h3>
                <p>{languages}</p>
            </div>
            <div>
                <h3 className='text-m font-semibold mt-4'>Subjects: </h3>
                <p>{subjects}</p>
            </div>
            <div>
                <h3 className='text-m font-semibold mt-4'>About Me</h3>
                <p>{about}</p>
                <p className='text-xs mt-4'>{contact}</p>
            </div>
        </section>
    );
};

export default UserPage;
