const shortid = require('shortid');
const db = require('../../lib/db');

// const findBy = (value, prop) => x => x.request.find(y => y[prop] === value);

const parsePending = user => arr => ({
    incoming: arr.filter(x => x.requests.find(y => y.tutor === user)),
    outgoing: arr.filter(x => x.requests.find(y => y.student === user)),
});

const handlePostRequest = (req, res) => {
    db.addRequest(req.body)
        .then(() => res.end());
};

const handlePostUser = (req, res) => {
    db.createUser({
        ...req.body,
        id: req.user.id,
        shortId: shortid.generate(),
        requests: [],
        connections: [],
    }).then(() => res.end());
};

const handleGetConnections = (req, res) => {
    db.getConnections(req.user.shortId)
        .then(data => res.json(data));
};

const handleGetPending = (req, res) =>
    db.getPending(req.user.shortId)
        .then(parsePending(req.user.shortId))
        .then(x => res.json(x));

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
            requests: req.user.requests,
            connections: req.user.connections,
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
    handlePostRequest,
    handlePostUser,
    handleGetMe,
    handleGetTutors,
    handleGetUser,
    handleGetConnections,
    handleGetPending,
};
