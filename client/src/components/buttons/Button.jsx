import React from 'react';

const Button = ({ onClick, text = '', classes = '' }) => {
    return (
        <button onClick={onClick} className={`hover:bg-blue-400 bg-blue-600 text-white p-2 rounded ${classes}`}>
            {text}
        </button>
    );
};

export default Button;
