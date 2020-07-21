import React, { useEffect, useState } from 'react';
import Auth from './components/Auth.jsx';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import UserForm from './components/UserForm.jsx';

const App = () => {
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ profile, setProfile ] = useState(false);

    const setAuthInfo = data => {
        setProfile(data.hasProfile);
        setAuthenticated(true);
    };

    const handleCreateProfile = () => setProfile(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/users/me', {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
        })
            .then(res => res.json())
            .then(data => data
                ? setAuthInfo(data)
                : setAuthenticated(false)
            )
            .catch(console.error);
    }, []);

    const home = authenticated && !profile
        ? <Redirect to='/create-profile' />
        : <div>HELLO WORLD</div>;

    return (
        <BrowserRouter>
            <Auth authenticated={authenticated} />
            <Switch>
                <Route exact path='/'>
                    {home}
                </Route>
                <Route path='/create-profile'>
                    <UserForm onSubmit={handleCreateProfile} hasProfile={profile} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
