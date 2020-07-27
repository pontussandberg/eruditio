const router = require('express').Router();
const {
    handlePostRequest,
    handlePostUser,
    handleGetMe,
    handleGetTutors,
    handleGetUser,
    handleGetConnections,
    handleGetPending,
} = require('./handlers');

router.post('/', handlePostUser);
router.post('/request', handlePostRequest);

router.get('/me', handleGetMe);
router.get('/tutors', handleGetTutors);
router.get('/:id', handleGetUser);
router.get('/me/connections', handleGetConnections);
router.get('/me/pending', handleGetPending);

module.exports = router;
