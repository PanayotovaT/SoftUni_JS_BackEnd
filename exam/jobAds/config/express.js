const express = require('express');
const { create: handlebars} = require('express-handlebars');
const session = require('express-session');
const userSession = require('../middlewares/useSession');

module.exports = (app) => {

    app.engine('.hbs', handlebars({
        extname: '.hbs'
    }).engine);
    app.set('view engine', '.hbs');

}

