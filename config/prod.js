// prod.js - productions keys

module.exports = {    
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGOURI,
    cookieKey: process.env.COOKIEKEY,
    stripePublishableKey: process.env.STRIPEPUBLISHABLEKEY,
    stripeSecretKey: process.env.STRIPESECRETKEY,
    sendGridKey: process.env.SENDGRIDKEY,
    redirectDomain: process.env.REDIRECTDOMAIN
};