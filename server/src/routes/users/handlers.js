const shortid = require('shortid');
const db = require('../../lib/db');

const handlePostUser = (req, res) => {
    db.createUser({
        ...req.body,
        id: req.user.id,
        shortId: shortid.generate(),
    }).then(() => res.end());
};

const handleGetMe =  (req, res) => {
    res.json(req.user || false);
};

const handleGetTutors = (req, res) => {
    db.getTutors()
        .then(data => res.json(data));
};

const handleGetUser = (req, res) => {
    db.getUserById(req.params.id.toString())
        .then(data => res.json(data));
};

module.exports = {
    handlePostUser,
    handleGetMe,
    handleGetTutors,
    handleGetUser,
};
