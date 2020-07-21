require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('./lib/passport');
const { auth } = require('./routes');

const app = express();

app.use(cookieSession({
    name: 'session',
    maxAge: process.env.COOKIE_AGE,
    keys: [ process.env.COOKIE_KEY ],
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET',
    credentials: true,
}));


app.use('/auth', auth);

app.get('/getUser', (req, res) => {
    res.json(req.user || false);
});
app.get('/', (req, res) => res.redirect('http://localhost:3000'));

module.exports = app;
