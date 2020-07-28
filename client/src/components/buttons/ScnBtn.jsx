import React from 'react';

const style = 'hover:bg-blue-600 hover:text-white border-2 border-blue-600 text-blue-600 p-2 rounded text-sm md:text-base text-center'

const ScnBtn = ({ onClick, text = '', classes = '' }) => (
    <button onClick={onClick} className={`${style} ${classes}`}>
        {text}
    </button>
);

export default ScnBtn;
