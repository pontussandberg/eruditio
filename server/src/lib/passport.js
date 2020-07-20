const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
}, (accessToken, refreshToken, profile, done) => done(null, profile));

passport.serializeUser((profile, done) =>
    done(null, {
        id: profile.id,
        provider: profile.provider,
    }));

passport.deserializeUser((profile, done) => done(null, profile));

passport.use(googleStrategy);

module.exports = passport;
