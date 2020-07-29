import React from 'react';
import googleSVG from '../../media/google.svg';

const GoogleOAuth = ({ classes }) => (
    <a
        style={{ backgroundColor: '#4285F4', borderColor: '#4285F4' }}
        className={`flex border rounded-sm ${classes}`}
        href='http://localhost:5000/auth/google'
    >
        <img style={{ width: '36px' }} className='bg-white p-2 rounded-sm' src={googleSVG} />
        <span className='text-sm text-white font-semibold p-2'>Sign in with Google</span>
    </a>
);

export default GoogleOAuth;
