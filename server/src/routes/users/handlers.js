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
    const response = req.user === undefined
        ? false
        : {
            name: req.user.name,
            lastName: req.user['last-name'],
            role: req.user.role,
            timezone: req.user.timezone,
            contact: req.user.contact,
            languages: req.user.languages,
            subjects: req.user.subjects,
            shortId: req.user.shortId,
            hasProfile: req.user.hasProfile,
            about: req.user.about,
        };
    res.json(response);
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
