import React from 'react';
import googleSVG from '../../media/google.svg';

const GoogleOAuth = () => (
    <a
        className='flex border rounded-sm bg-google border-google'
        href='/auth/google'
    >
        <img
            style={{ width: '36px' }}
            className='bg-white p-2 rounded-sm'
            src={googleSVG}
        />
        <span className='text-sm text-white font-semibold p-2'>
            Sign in with Google
        </span>
    </a>
);

export default GoogleOAuth;
