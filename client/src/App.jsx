import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ChatRoom from './components/ChatRoom.jsx';
import UserForm from './components/UserForm.jsx';
import TutorList from './components/TutorList.jsx';
import Header from './components/Header.jsx';
import UserPage from './components/UserPage.jsx';

const App = () => {
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ profile, setProfile ] = useState(false);

    const setAuthInfo = data => {
        setProfile(data.hasProfile);
        setAuthenticated(true);
    };

    const handleCreateProfile = () => setProfile(true);

    useEffect(() => {
        fetch('/api/users/me', {
            method: 'GET',
            // credentials: 'include',
            // headers: {
            //     Accept: 'application/json',
            //     'Content-Type': 'application/json',
            //     'Access-Control-Allow-Credentials': true,
            // },
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
        : <div className='text-pink-500'>HELLO WORLD</div>;

    return (
        <BrowserRouter>
            <div className='container mx-auto px-2'>
                <Header authenticated={authenticated} />
                <Switch>
                    <Route path='/tutors' component={TutorList} />
                    <Route path='/users/:id' component={UserPage} />
                    <Route exact path='/'>
                        {home}
                    </Route>
                    <Route path='/create-profile'>
                        <UserForm onSubmit={handleCreateProfile} hasProfile={profile} />
                    </Route>
                    <Route path='/room'>
                        <ChatRoom />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
