import React from 'react';
import { Link } from 'react-router-dom';
import Auth from './Auth.jsx';

const Header = ({ authenticated }) => (
    <header className='flex justify-between items-center mb-6 h-16'>
        <Link to='/'>
            <h1 className='text-blue-600 font-bold text-2xl'>Eruditio</h1>
        </Link>
        <nav className='flex items-center'>
            <Link className='mx-4' to='/'>Home</Link>
            <Link className='mx-4' to='/tutors'>Tutors</Link>
        </nav>
        <Auth authenticated={authenticated} />
    </header>
);

export default Header;
