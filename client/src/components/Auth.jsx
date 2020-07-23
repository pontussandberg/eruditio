import React from 'react';
import GoogleOAuth from './buttons/GoogleOAuth.jsx';
import LogOut from './buttons/LogOut.jsx';

const Auth = ({ authenticated }) => {
    const btns = authenticated
        ? <LogOut />
        : <GoogleOAuth />;

    return (
        <div className='btn-container'>
            {btns}
        </div>
    );
};

export default Auth;
