import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Classroom from './components/Classroom';
import Connections from './components/Connections';
import Header from './components/Header';
import Home from './components/Home';
import UserForm from './components/UserForm';
import UserPage from './components/UserPage';
import TutorList from './components/TutorList';
import MobileMenu from './components/MobileMenu';
import { Profile } from './lib/interfaces';

const initProfile: Profile = {
    about: '',
    connections: [],
    contact: '',
    hasProfile: false,
    languages: '',
    lastName: '',
    name: '',
    requests: [],
    role: '',
    shortId: '',
    subjects: '',
    timezone: ''
}

const App: React.FC = () => {
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ hasProfile, setHasProfile ] = useState(false);
    const [ profileData, setProfileData ] = useState(initProfile);

    let { pathname } = useLocation();

    const setProfileInfo = (data: Profile): void => {
        console.log(data);
        setHasProfile(data.hasProfile);
        setAuthenticated(true);
        setProfileData(data);
    };

    const handleCreateProfile = (): void => setHasProfile(true);

    useEffect(() => {
        fetch('/api/users/me')
            .then(res => res.json())
            .then(data => data
                ? setProfileInfo(data)
                : setAuthenticated(false)
            )
            .catch(console.error);
    }, [ pathname ]);

    const home = authenticated && !hasProfile
        ? <Redirect to='/create-profile' />
        : <Home authenticated={authenticated} />;

    return (
        <>
            <div className='container mx-auto px-2 pb-24 md:pb-2'>
                <Header
                    authenticated={authenticated}
                    user={profileData.shortId}
                    hasProfile={hasProfile}
                />
                <Switch>
                    <Route path='/tutors'>
                        <TutorList shortId={profileData.shortId} />
                    </Route>
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
            <MobileMenu authenticated={authenticated} hasProfile={hasProfile} user={profileData.shortId}/>
        </>
    );
};

export default App;
