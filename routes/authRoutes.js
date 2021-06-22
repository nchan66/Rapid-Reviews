const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google',
        passport.authenticate('google', { 
            scope:['profile', 'email']
        })
    );

    app.get('/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }    
    );

    app.get('/api/cur_user', (req, res) => {
        res.send(req.user);
        // console.log(req);
    })

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
}