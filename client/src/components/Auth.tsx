import React from 'react';
import GoogleOAuth from './buttons/GoogleOAuth';
import LogOut from './buttons/LogOut';
import { AuthProps } from '../lib/interfaces'


const Auth: React.FC<AuthProps> = ({ authenticated }) => {
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
