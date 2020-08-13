import React from 'react';

const style = 'flex flex-col md:flex-row shadow m-4 justify-between py-2 px-4 md:items-center';

const ConItem = ({ con, children }) => (
    <div className={style}>
        <span className='mb-3'>{con.name} {con['last-name']}</span>
        <div className='flex items-stretch justify-end'>
            {children.map((x, i) => React.cloneElement(x, {
                key: i,
                classes: `${x.props.classes} ml-2`,
            }))}
        </div>
    </div>
);

export default ConItem;