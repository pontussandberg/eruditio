require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('./lib/passport');
const { auth, users, rooms } = require('./routes');

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
app.use('/api/rooms', rooms);

app.get('/', (req, res) => res.redirect('http://localhost:3000'));

module.exports = app;
