import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../media/nav-icons/home.svg';
import tutorsIcon from '../media/nav-icons/tutors.svg';
import profileIcon from '../media/nav-icons/profile.svg';
import connectionsIcon from '../media/nav-icons/connections.svg';

const MobileMenu = ({ authenticated, hasProfile, user }) => (
    <nav className='md:hidden flex items-center justify-around fixed bottom-0 left-0 w-full h-20 bg-blue-400 text-white'>
        <Link className='mx-4 flex flex-col items-center' to='/'>
            <img src={homeIcon} />
            <span className='text-xs'>Home</span>
        </Link>
        <Link className='mx-4 flex flex-col items-center' to='/tutors'>
            <img src={tutorsIcon} />
            <span className='text-xs'>Tutors</span>
        </Link>
        {authenticated 
            && <Link className='mx-4 flex flex-col items-center' to='/connections'>
                <img src={connectionsIcon} />
                <span className='text-xs'>Connections</span>
            </Link>}
        {authenticated
            && hasProfile
            && <Link 
                to={`/users/${user}`}
                className='mx-4 flex flex-col items-center'
            >
                <img src={profileIcon} />
                <span className='text-xs'>Profile</span>
            </Link>}
    </nav>
)

export default MobileMenu