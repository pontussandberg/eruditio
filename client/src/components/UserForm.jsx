import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Input from './Input.jsx';
import DropDown from './DropDown.jsx';
import '../css/index.css';

const options = [
    { name: 'hello', value: 'underworld1' },
    { name: 'hello1', value: 'underworld2' },
    { name: 'hello2', value: 'underworld3' },
    { name: 'hello3', value: 'underworld4' },
];

const roles = [
    { name: 'Tutor', value: 'tutor' },
    { name: 'Student', value: 'student' },
];

const subjects = [
    { name: 'Maths', value: 'maths' },
    { name: 'English', value: 'english' },
    { name: 'Latin', value: 'latin' },
];

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
            <form>
                <Input onChange={handleChange} label='Name' name='name' />
                <Input onChange={handleChange} label='Last Name' name='last-name' />
                <DropDown onChange={handleChange} label='Timezone' name='timezone' options={options} />
                <DropDown onChange={handleChange} label='Role' name='role' options={roles} />
                <DropDown onChange={handleChange} label='Subjects' name='subjects' multiple={true} options={subjects} />
                <Input onChange={handleChange} label='Languages' name='languages' />
                <Input onChange={handleChange} label='Contact' name='contact' />
                <button onClick={handleSubmit} type='submit'>Create Profile</button>
            </form>
        );
};

export default UserForm;
