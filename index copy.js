const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport'); 
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./models/user');
require('./models/survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();


app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === 'production'){
    // express will serve up production assets
    // like our main.js file, or main.css file
    app.use(express.static('client/build'));

    // express will serve up the index.html file
    // if it doesnt recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT);