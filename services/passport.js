const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose'); 

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        });
}); 

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) =>{
        // console.log('access token', accessToken);
        // console.log('refresh token', refreshToken);
        // console.log('profile: ', profile);

        // mongoose query 
        User.findOne({ googleID: profile.id })
            .then((existingUser) => {
                
                if (existingUser) { // we already have this user with the same google id
                    done(null, existingUser); // passport callback
                } else { // add new google id into collection
                    new User({ googleID: profile.id })
                    .save()
                    .then(user => done(null, user)) // passport callback
                }
        });
       
    }
));