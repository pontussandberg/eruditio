import React from 'react';
import GoogleOAuth from './buttons/GoogleOAuth';
import LogOut from './buttons/LogOut';
import { AuthProps } from '../lib/interfaces';

const getBtn = (authenticated: boolean) => authenticated
    ? <LogOut />
    : <GoogleOAuth />;

const Auth: React.FC<AuthProps> = ({ authenticated }) => (
    <div className='btn-container'>
        {getBtn(authenticated)}
    </div>
);

export default Auth;
