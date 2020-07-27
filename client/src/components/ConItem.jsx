import React from 'react';

const ConItem = ({ con, children }) => (
    <div className='flex shadow m-4 justify-between py-2 px-4 items-center'>
        <span>{con.name} {con['last-name']}</span>
        <div className='flex items-stretch'>
            {children.map(x => React.cloneElement(x, {
                key: x.props.text,
                classes: `${x.props.classes} ml-2`,
            }))}
        </div>
    </div>
);

export default ConItem;
