require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('./lib/passport');

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

app.get('/lol', (req, res) => res.json('hi'));

app.get('/auth/google', passport.authenticate('google', { scope: [ 'openid' ] }));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: '/',
}));
app.get('/', (req, res) => res.end());

module.exports = app;
