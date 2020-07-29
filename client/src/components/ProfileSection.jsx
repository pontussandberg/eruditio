import React from 'react';

const ProfileSection = ({ content, title }) => (
    <div className='mt-2'>
        <h3 className='text-xl'>{title}</h3>
        <p>{content}</p>
    </div>
);

export default ProfileSection;
