import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from './buttons/Button.jsx';
import Input from './Input.jsx';
import DropDown from './DropDown.jsx';
import '../css/index.css';
import roles from '../info/roles.json';
import timezones from '../info/timezones.json';

const UserForm = ({ onSubmit, hasProfile }) => {
    const [ state, setState ] = useState({});
    const handleChange = event => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(state),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true,
            },
        })
            .then(() => onSubmit());
    };

    return hasProfile
        ? <Redirect to='/' />
        : (
            <div className='flex justify-center'>
                <form className='flex flex-col flex-wrap items-center'>
                    <section className='mb-8 ml-4 self-start'>
                        <h2 className='text-2xl'>Create a User Profile</h2>
                        <p className='text-sm text-gray-700'>Tell us about you and your interests.</p>
                    </section>
                    <div className='flex flex-wrap flex-col'>
                        <div className='flex flex-wrap justify-center'>
                            <Input onChange={handleChange} label='Name' name='name' />
                            <Input onChange={handleChange} label='Last Name' name='last-name' />
                        </div>
                        <div className='flex flex-wrap justify-center'>
                            <Input onChange={handleChange} label='Languages' name='languages' />
                            <Input onChange={handleChange} label='Contact' name='contact' />
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-center'>
                        <Input onChange={handleChange} label='Subjects' name='subjects' />
                        <Input onChange={handleChange} label='About me' name='about' />
                    </div>
                    <div className='flex flex-wrap justify-center'>
                        <DropDown onChange={handleChange} label='Timezone' name='timezone' options={timezones} init='Select your timezone' />
                        <DropDown onChange={handleChange} label='Role' name='role' options={roles} init='Select your role' />
                    </div>

                    <Button onClick={handleSubmit} text='Create profile' classes='w-56 mt-6' type='submit'>Create Profile</Button>
                </form>
            </div>
        );
};

export default UserForm;
