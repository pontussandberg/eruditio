import React from 'react';
import { Link } from 'react-router-dom';

function ButtonLink({ text, path, classes = '' }) {
    return (
        <Link
            className={`hover:bg-blue-400 bg-blue-600 text-white p-2 rounded ${classes}`}
            to={path}
        >
            {text}
        </Link>
    );
}

export default ButtonLink;
