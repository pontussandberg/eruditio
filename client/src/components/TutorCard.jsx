import React from 'react';
import Button from './buttons/Button';
import ProfileSection from './ProfileSection.jsx';
import ScnBtnLink from './buttons/ScnBtnLink';
import { addRequest, acceptRequest, cancelRequest } from '../lib/fetchers.js';

const isInObj = elem => obj => obj.tutor === elem || obj.student === elem;

const showBtns = (shortId, tutor) =>
    !shortId
    || tutor.shortId === shortId
    || tutor.connections.some(isInObj(shortId));

const TutorCard = ({ tutor, shortId, refresh }) => (
    <div className='shadow p-6 rounded flex justify-between' key={tutor.shortId} >
        <div className='flex flex-col'>
            <h2 className='text-2xl font-semibold'>
                {tutor.name} {tutor['last-name']}
            </h2>
            <ProfileSection title='Subjects' content={tutor.subjects} />
            <ProfileSection title='Languages' content={tutor.languages} />
        </div>
        <div className='flex flex-col'>
            {showBtns(shortId, tutor)
                ? null
                : tutor.requests.some(y => y.tutor === shortId)
                    ? <Button
                        text='Accept'
                        classes='veiw-button mb-4'
                        onClick={() => acceptRequest(tutor.shortId).then(refresh)}
                    />
                    : tutor.requests.some(y => y.student === shortId)
                        ? <Button
                            text='Cancel'
                            classes='danger mb-4'
                            onClick={() => cancelRequest(tutor.shortId).then(refresh)}
                        />
                        : <Button
                            onClick={() =>
                                addRequest({ tutor: tutor.shortId, student: shortId }).then(refresh)}
                            classes='view-button mb-4'
                            text='Connect'
                        />}
            <ScnBtnLink
                path={`/users/${tutor.shortId}`}
                classes='view-button'
                text='View profile'
            />
        </div>
    </div>
);

export default TutorCard;
