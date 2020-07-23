const { MongoClient } = require('mongodb');
const users = require('./users.json');

const mongoUri = 'mongodb://localhost:27017';
const mongoOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const client = new MongoClient(mongoUri, mongoOpts);
client.connect()
    .then(client => client.db('eruditio').collection('users'))
    .then(col => col.insertMany(users))
    .then(() => console.log('DB successfully populated!'))
    .catch(console.error)
    .finally(() => client.close());
