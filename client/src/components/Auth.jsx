import React from 'react';
import GoogleOAuth from './buttons/GoogleOAuth';
import LogOut from './buttons/LogOut';

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
