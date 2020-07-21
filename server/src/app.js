require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const db = require('./lib/db');
const passport = require('./lib/passport');
const { auth } = require('./routes');

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
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST',
    credentials: true,
}));


app.use('/auth', auth);

app.get('/api/users/me', (req, res) => {
    res.json(req.user || false);
});

app.post('/api/users', (req, res) => {
    db.createUser({
        ...req.body,
        id: req.user.id,
    }).then(() => res.end());
});

app.get('/', (req, res) => res.redirect('http://localhost:3000'));

module.exports = app;
