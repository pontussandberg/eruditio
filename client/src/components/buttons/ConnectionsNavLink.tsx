import React from 'react';
import { ButtonProps } from '../../lib/interfaces';

const ConnectionsNavLink: React.FC<ButtonProps> = ({ onClick, classes, text }) => (
    <button
        className={`flex-grow p-4 text-sm md:text-base ${classes}`}
        onClick={onClick}
    >
        {text}
    </button>
);

export default ConnectionsNavLink;
