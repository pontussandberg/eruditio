import React from 'react';
import { Link } from 'react-router-dom';

const style = 'hover:bg-blue-600 hover:text-white border-2 border-blue-600 text-blue-600 p-2 rounded text-sm md:text-base text-center'

const ScnBtnLink = ({ path, text = '', classes = '' }) => (
    <Link to={path} className={`${style} ${classes}`}>
        {text}
    </Link>
);

export default ScnBtnLink;
