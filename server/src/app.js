require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('./lib/passport');
const { auth, users } = require('./routes');
const db = require('./lib/db');
const uuid = require('uuid');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
    name: 'session',
    maxAge: process.env.COOKIE_AGE,
    keys: [ process.env.COOKIE_KEY ],
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
app.use('/api/users', users);

app.get('/', (req, res) => res.redirect('http://localhost:3000'));

app.post('/api/rooms', (req, res) => {
    const id = uuid.v1();
    db.createRoom({ id, ...req.body, tutor: req.user.shortId })
        .then(() => res.json(id));
});

// app.route('/api/rooms/:id')
//     .get((req, res) => {
//         db.findRoom(req.params.id)
//             .then(data => res.json(data));
//     })
//     .delete((req, res) => {
//         db.deleteRoom()
//     });

module.exports = app;
