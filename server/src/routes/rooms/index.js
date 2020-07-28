const router = require('express').Router();
const uuid = require('uuid');
const db = require('../../lib/db');


router.get('/', (req, res) => {
    db.findRoomsByUser(req.user.shortId)
        .then(data => res.json(data));
});

router.post('/', (req, res) => {
    const id = uuid.v1();
    db.createRoom({ id, ...req.body, tutor: req.user.shortId })
        .then(() => res.json(id));
});

module.exports = router;
