import React from 'react';
import { ConItemProps } from '../lib/interfaces';

const style = 'flex flex-col md:flex-row shadow m-4 justify-between py-2 px-4 md:items-center';

const renderChildren = (children: Array<React.ReactElement>) => children.map(((x, i) =>
    React.cloneElement(x, {
        key: i,
        classes: `${x.props.classes} ml-2`,
    })));

const ConItem: React.FC<ConItemProps> = ({ con, children }) => (
    <div className={style}>
        <span className='mb-3'>{con.name} {con['last-name']}</span>
        <div className='flex items-stretch justify-end'>
            {renderChildren(children)}
        </div>
    </div>
);

export default ConItem;
