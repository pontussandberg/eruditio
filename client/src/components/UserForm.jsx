import React, { useState } from 'react';
import Input from './Input';
import DropDown from './DropDown';

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

const UserForm = () => {
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
        fetch('http://localhost:5000/api/users', {
            method: 'POST',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            body: JSON.stringify(state),
        });
    };

    return (
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

// const Form = () => {
//     const [ input, setInput ] = useState({
//         input1: '',
//         input2: '',
//     })

//     const handleChange = event => {
//         const { name, value } = event.target
//         setInput({
//             ...input,
//             [name]: value,
//         })
//     }

//     return (
//         <form>
//             <input onChange={handleChange} value={input} />
//         </form>
//     )
// }
