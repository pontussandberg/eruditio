const db = require('./db.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userExists = doc => doc.hasOwnProperty('id');

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
}, (accessToken, refreshToken, profile, done) => done(null, profile));

passport.serializeUser((profile, done) => {
    const id = profile.id.concat(':', profile.provider);
    done(null, id);
});

passport.deserializeUser((id, done) => db.getUser(id)
    .then(userExists)
    .then(bool => done(null, { id, hasProfile: bool }))
    .catch(console.error)
);

passport.use(googleStrategy);


module.exports = passport;
