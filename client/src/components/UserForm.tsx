import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Button from './buttons/Button';
import DropDown from './DropDown';
import FormHeader from './FormHeader';
import Input from './Input';
import validator from '../lib/validator.js';
import { createProfile } from '../lib/fetchers.js';
import { map, pipe } from '../lib/util.js';
import roles from '../info/roles.json';
import timezones from '../info/timezones.json';

const initState = {
    about: '',
    contact: '',
    languages: '',
    'last-name': '',
    name: '',
    role: '',
    subjects: '',
    timezone: '',
};

const trimValue = ([ key, value ]: [ string, string ]) => [ key, value.trim() ];

const removeWhiteSpaces = pipe(
    Object.entries,
    map(trimValue),
    Object.fromEntries
);

interface UserFormProps {
    onSubmit: CallableFunction,
    hasProfile: boolean
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, hasProfile }) => {
    const [ state, setState ] = useState(initState);
    const [ error, setError ] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        });
        setError('');
    };

    const handleSubmit = (event: React.MouseEvent): void => {
        event.preventDefault();

        if (!validator(state)) setError('All fields are required!');
        else {
            const profile = removeWhiteSpaces(state);
            createProfile(profile)
                .then(() => onSubmit());
        }
    };

    if (hasProfile) return <Redirect to='/' />;

    return (
        <div className='flex justify-center'>
            <form className='flex flex-col flex-wrap items-center'>
                <FormHeader
                    title='Create a User Profile'
                    text='Tell us about you and what you are looking for.'
                    error={error}
                />
                <div className='flex flex-wrap flex-col'>
                    <div className='flex flex-wrap justify-center'>
                        <Input onChange={handleChange} label='Name' name='name' />
                        <Input
                            onChange={handleChange}
                            label='Last Name'
                            name='last-name'
                        />
                    </div>
                    <div className='flex flex-wrap justify-center'>
                        <Input
                            onChange={handleChange}
                            label='Languages'
                            name='languages'
                        />
                        <Input
                            onChange={handleChange}
                            label='Contact'
                            name='contact'
                        />
                    </div>
                </div>
                <div className='flex flex-wrap justify-center'>
                    <Input onChange={handleChange} label='Subjects' name='subjects' />
                    <Input onChange={handleChange} label='About me' name='about' />
                </div>
                <div className='flex flex-wrap justify-center'>
                    <DropDown
                        onChange={handleChange}
                        label='Timezone'
                        name='timezone'
                        options={timezones}
                        init='Select your timezone'
                    />
                    <DropDown
                        onChange={handleChange}
                        label='Role'
                        name='role'
                        options={roles}
                        init='Select your role'
                    />
                </div>
                <Button
                    onClick={handleSubmit}
                    text='Create profile'
                    classes='w-56 mt-6'
                />
            </form>
        </div>
    );
};

export default UserForm;
