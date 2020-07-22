import React, { useEffect, useState } from 'react';

const UserPage = ({ match: { params: { id } } }) => {
    const [ user, setUser ] = useState(null);
    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(user => setUser(user))
            .catch(console.error);
    }, []);

    if(!user){
        return <div>LOADING...</div>;
    }

    const {
        'last-name': lastname,
        name,
        timezone,
        languages,
        contact,
        role,
        subjects,
    } = user;

    return (
        <section>
            <h2>{name} {lastname}</h2>
            <h3>{role}</h3>
            <div>
                <h3>Languages</h3>
                <p>{languages}</p>
            </div>
            <div>
                <h3>Subjects</h3>
                <p>{subjects}</p>
            </div>
            <div>
                <p>{contact}</p>
                <p>{timezone}</p>
            </div>
        </section>
    );
};

export default UserPage;
