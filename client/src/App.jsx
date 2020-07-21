import React, { useEffect, useState } from 'react';
import Auth from './components/Auth.jsx';


const App = () => {
    const [ authenticated, setAuthenticated ] = useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/getUser', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
        })
            .then(res => res.json())
            .then(data => setAuthenticated(data.id ? true : false))
            .catch(console.error);
    });
    return (
        <>
            <Auth authenticated={authenticated} />
            <div>
            HELLO WORLD
            </div>
        </>
    );
};

export default App;
