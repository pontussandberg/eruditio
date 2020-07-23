import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Classroom from './components/Classroom.jsx';
import Connections from './components/Connections.jsx';
import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import UserForm from './components/UserForm.jsx';
import UserPage from './components/UserPage.jsx';
import TutorList from './components/TutorList.jsx';

const App = () => {
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ hasProfile, setHasProfile ] = useState(false);
    const [ profileData, setProfileData ] = useState({});

    const setProfileInfo = data => {
        setHasProfile(data.hasProfile);
        setAuthenticated(true);
        setProfileData(data);
    };

    const handleCreateProfile = () => setHasProfile(true);

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
            .then(x => console.log(x) || x)
            .then(data => data
                ? setProfileInfo(data)
                : setAuthenticated(false)
            )
            .catch(console.error);
    }, []);

    const home = authenticated && !hasProfile
        ? <Redirect to='/create-profile' />
        : <Home />;

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
                        <UserForm onSubmit={handleCreateProfile} hasProfile={hasProfile} />
                    </Route>
                    <Route path='/connections'>
                        <Connections authenticated={authenticated} profile={profileData}/>
                    </Route>
                    <Route path='/room/:id' component={Classroom} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
