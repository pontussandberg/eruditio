import React from 'react';

const customStyles = {
    top: '-15px',
    left: '15px',
};

const inputClasses = 'w-64 border-solid border-2 rounded border-blue-600 px-3 py-3 outline-none focus:border-blue-700';

const Input = ({ label, name, onChange }) => (
    <div className='flex flex-col relative mb-8 mx-4'>
        <label
            htmlFor={name}
            style={customStyles}
            className='text-gray-700 absolute bg-white py-1 px-2'
        >
            {label}
        </label>
        <input
            id={name}
            type='text'
            name={name}
            onChange={onChange}
            className={inputClasses}
        />
    </div>
);

export default Input;
