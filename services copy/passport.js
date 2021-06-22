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
    callbackURL: '/auth/google/callback',
    proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) =>{
        // console.log('access token', accessToken);
        // console.log('refresh token', refreshToken);
        // console.log('profile: ', profile);

        // mongoose query 
        const existingUser = await User.findOne({ googleID: profile.id })
            
            if (existingUser) { // we already have this user with the same google id
                return done(null, existingUser); // passport callback
            } // add new google id into collection
            const user = await new User({ googleID: profile.id }).save();
            done(null, user);
            
       
    }
));
