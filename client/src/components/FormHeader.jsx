import React from 'react';

const FormHeader = ({ title, text, error }) => (
    <section className='mb-8 ml-4 self-start'>
        <h2 className='text-2xl'>{title}</h2>
        <p className='text-sm text-gray-700'>{text}</p>
        {error && <p className='text-sm text-red-700'>{error}</p>}
    </section>
);

export default FormHeader;
