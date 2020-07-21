import React from 'react';

const Input = ({ label, name, onChange }) => (
    <label>
        {label}:
        <input type='text' name={name} onChange={onChange} />
    </label>
);

export default Input;
