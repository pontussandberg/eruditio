const { MongoClient } = require('mongodb');

const mongoUri = 'mongodb://localhost:27017';
const mongoOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connect = (client, collection) => client.connect()
    .then(client => client.db('eruditio').collection(collection));

const createUser = user => {
    const client = new MongoClient(mongoUri, mongoOpts);
    return connect(client, 'users')
        .then(col => col.insertOne(user))
        .finally(() => client.close());
};

const getUser = id => {
    const client = new MongoClient(mongoUri, mongoOpts);
    return connect(client, 'users')
        .then(col => col.findOne({ id }, { projection: { _id: 0 } }))
        .then(res => res || {})
        .finally(() => client.close());
};

const getUserById = shortId => {
    const client = new MongoClient(mongoUri, mongoOpts);
    return connect(client, 'users')
        .then(col => col.findOne({ shortId }, { projection: { _id: 0 } }))
        .then(res => res || {})
        .finally(() => client.close());
};

const getTutors = () => {
    const client = new MongoClient(mongoUri, mongoOpts);
    return connect(client, 'users')
        .then(col => col.find({ role: 'tutor' }, { projection: { _id: 0 } }))
        .then(res => res.toArray())
        .finally(() => client.close());
};

module.exports = {
    createUser,
    getUser,
    getUserById,
    getTutors,
};
