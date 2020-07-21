import React from 'react';

const getOptions = list =>
    list.map(obj => <option value={obj.value} key={JSON.stringify(obj)}>{obj.name}</option>);

const DropDown = ({ label, name, options, onChange, multiple = false }) => (
    <label>
        {label}:
        <select onChange={onChange} multiple={multiple} name={name}>
            { getOptions(options) }
        </select>
    </label>
);

export default DropDown;
