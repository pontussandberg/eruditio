const router = require('express').Router();
const {
    handlePostRequest,
    handlePostUser,
    handleGetMe,
    handleGetTutors,
    handleGetUser,
    handleGetConnections,
    handleGetPending,
    handleAccept,
    handleDecline,
    handleCancel,
} = require('./handlers');

router.post('/', handlePostUser);
router.post('/request', handlePostRequest);

router.get('/me', handleGetMe);
router.get('/tutors', handleGetTutors);
router.get('/:id', handleGetUser);

router.get('/me/connections', handleGetConnections);
router.get('/me/pending', handleGetPending);

router.put('/me/pending/accept', handleAccept);
router.put('/me/pending/decline', handleDecline);
router.put('/me/pending/cancel', handleCancel);

module.exports = router;
