import React from 'react';
import { Link } from 'react-router-dom';

const ScnBtnLink = ({ path, text = '', classes = '' }) => {
    return (
        <Link to={path} className={`hover:bg-blue-600 hover:text-white border-2 border-blue-600 text-blue-600 p-2 rounded ${classes}`}>
            {text}
        </Link>
    );
};

export default ScnBtnLink;
