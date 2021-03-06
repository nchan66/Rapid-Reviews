const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const listSurveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });

        res.send(listSurveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('thanks for voting!');
    });

    app.post('/api/survey/delete', async (req, res) => {
        console.log('delete survey with _id: ',req.body.id);
        try {
            Survey.deleteOne({
                "_id": req.body.id
            }).exec();
            const user = await req.user.save();
            res.send(user);
        } catch (err){
            console.log('invalid survey id: ', err);
        }
    });

    app.post('/api/surveys/webhooks', (req, res) => {

        const p = new Path('/api/surveys/:surveyId/:choice');
    
        const events = _.map( req.body ,({ email, url}) => {
                
                const match = p.test(new URL(url).pathname);
                if (match){
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
        });
        const compactEvents = _.compact(events);
        const uniqEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        
        const updateSurvey = _.forEach(uniqEvents, ({ email, surveyId, choice }) => {
            Survey.updateOne({
                _id : surveyId,
                recipients: {
                    $elemMatch: { email: email, responded: false }
                }
            }, {
                $inc: { [choice]: 1},
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }).exec();
        });
        const surveyValue = _.values(updateSurvey);
        console.log(surveyValue);

        res.send({});

    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {

        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body, 
            recipients: recipients.split(',').map(email => ({ email : email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()

        });

        // send email here after survey is completed
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }

    });
};


/*
Survey.updateOne({
    id: surveyId,
    recipients: {
        $elemMatch: { email: email, responded: false }
    }
}, {
    $inc: { [choice]: 1 },
    $set: { 'recipient.$.responded': true }
})

*/