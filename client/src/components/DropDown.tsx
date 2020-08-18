import React from 'react';
import { DropDownProps } from '../lib/interfaces';

const style = 'w-64 border-2 border-blue-600 border-solid outline-none rounded p-3 appearance-none select-bg';

const getOptions = (list: Array<{value: string, name: string}>) =>
    list.map(obj => <option value={obj.value} key={JSON.stringify(obj)}>{obj.name}</option>);

const DropDown: React.FC<DropDownProps> = ({ label, name, options, init, onChange, multiple = false }) => (
    <div className='flex flex-col mx-4'>
        <label className='text-gray-700' htmlFor={name}>{label}</label>
        <select
            className={style}
            id={name}
            onChange={onChange}
            multiple={multiple}
            name={name}
            defaultValue='none'
        >
            <option value="none" disabled hidden>Select an Option</option>
            <option disabled>{init}</option>
            { getOptions(options) }
        </select>
    </div>
);

export default DropDown;
