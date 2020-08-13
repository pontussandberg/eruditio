import React from 'react';
import { ButtonProps } from '../../lib/interfaces';

const style = 'hover:bg-blue-400 bg-blue-600 text-white p-2 rounded text-sm md:text-base';

const Button: React.FC<ButtonProps> = ({ onClick, text = '', classes = '' }) => (
    <button onClick={onClick} className={`${style} ${classes}`}>
        {text}
    </button>
);

export default Button;
