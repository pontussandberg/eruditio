const router = require('express').Router();
const {
    handlePostRequest,
    handlePostUser,
    handleGetMe,
    handleGetTutors,
    handleGetUser,
    handleGetPending,
} = require('./handlers');

router.post('/', handlePostUser);
router.post('/request', handlePostRequest);

router.get('/me', handleGetMe);
router.get('/tutors', handleGetTutors);
router.get('/:id', handleGetUser);
router.get('/me/pending', handleGetPending);

module.exports = router;
