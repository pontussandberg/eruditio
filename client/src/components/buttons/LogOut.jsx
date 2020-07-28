import React from 'react';
import logoutIcon from '../../media/nav-icons/logout.svg';

const LogOut = () => (
    <a href='http://localhost:5000/auth/logout'>
        <span className='hidden md:inline'>Logout</span>
        <img className='inline md:hidden w-8' src={logoutIcon} />
    </a>
);

export default LogOut;
