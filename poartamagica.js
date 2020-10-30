// Imports
// ==================================
const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const hbs = require('express-handlebars');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const url = require('url');
var fs = require('fs');
var socket = require('socket.io');
// global.fetch = require("node-fetch");

const Handlebars = require('handlebars');
const HandlebarsIntl = require('handlebars-intl');

const Influx = require('influx');
const mysql = require('mysql');
// ==================================
// End Imports

// Security Stuff
// ==================================
app.disable('x-powered-by')
app.use(helmet())
app.set('trust proxy', 1)
// ==================================
// End Security Stuff

// Configuration
// ==================================
// initialize session variable
var sess;
//secure session variable
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}));
//parse url encoded (as sent by html forms)
app.use(express.urlencoded({
    extended: false
}))
//parse json bodies (as sent by api)
app.use(express.json())
//initialize cookie parser
app.use(cookieParser("secret"))
//dir of static files css,img,js
const public_dir = path.join(__dirname, './public')
// set the directory for css/js/img files
app.use(express.static(public_dir))
// Dotenv Path
dotenv.config({
    path: './.env'
})
// ==================================
// End Configuration

// View Engine HBS
// ==================================
//set the view engine HBS
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: null,
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: [
        //  path to your partials
        path.join(__dirname, 'views/partials'),
    ]
}))

app.set('view engine', 'hbs')
// ==================================
// END View Engine HBS

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/save", (req, res) => {
    res.send(req.query)
})


const PORT = 6430;

var server = app.listen(PORT, console.log(`Server started on port ${PORT}`)).on('error', function (err) {
    console.log(err)
    // kill(PORT, 'tcp')
    //   .then(console.log)
    //   .catch(console.log)
});