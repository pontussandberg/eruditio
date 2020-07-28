import React from 'react';

const ScnBtn = ({ onClick, text = '', classes = '' }) => {
    return (
        <button onClick={onClick} className={`hover:bg-blue-600 hover:text-white border-2 border-blue-600 text-blue-600 p-2 rounded ${classes}`}>
            {text}
        </button>
    );
};

export default ScnBtn;
