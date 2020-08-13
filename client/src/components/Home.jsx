import React from 'react';
import logo from '../media/logo2.svg';
import ButtonLink from './buttons/ButtonLink';
import ScnBtnLink from './buttons/ScnBtnLink';

const Home = ({ authenticated }) => (
    <section className='flex flex-col md:flex-row justify-between md:mt-20'>
        <div className='md:mt-10 md:mb-0 mb-10'>
            <h2 className='text-3xl sm:text-4xl md:text-5xl line-height-custom'>
                Welcome to <span className='text-blue-600'>Eruditio</span>,
                <br/>
                the platform for learning
            </h2>
            <p className='text-base sm:text-lg md:text-xl text-gray-700 mt-2'>
                Find a suitable tutor and learn a new skill today.
            </p>
            <div className='flex mt-6'>
                <ButtonLink
                    text='Find a Tutor'
                    path='/tutors'
                    classes='sm:w-32 sm:h-12 flex items-center justify-center'
                />
                {authenticated
                    ? <ScnBtnLink
                        text='Connections'
                        path='/connections'
                        classes='mx-4 sm:w-32 sm:h-12 flex items-center justify-center'
                    />
                    : null
                }
            </div>
        </div>
        <img className='w-full md:w-2/4' src={logo} />
    </section>
);

export default Home;
