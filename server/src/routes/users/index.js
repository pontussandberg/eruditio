const router = require('express').Router();
const {
    handlePostUser,
    handleGetMe,
    handleGetTutors,
    handleGetUser,
} = require('./handlers');

router.post('/', handlePostUser);
router.get('/me', handleGetMe);
router.get('/tutors', handleGetTutors);
router.get('/:id', handleGetUser);

module.exports = router;
