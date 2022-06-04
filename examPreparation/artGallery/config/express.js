const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');
const userSession = require('../middlewares/userSession');

module.exports = (app) => {
    app.engine('.hbs', hbs.create({
        extname:'.hbs'
    }).engine);
    app.set('view engine', '.hbs');

    app.use('/static', express.static('static'));
    app.use(session({
        secret: 'My new secret!',
        resave: false,
        saveUninitialized: true,
        cookie:{
            secure: 'auto'
        }
    }));
    app.use(express.urlencoded({extended: true}));
    app.user(userSession());

}