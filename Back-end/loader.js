const app = require('./server');
const router = require('./routes/main.route');
const routerAuth = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const models = require('./models');
const expressValidator = require('express-validator');
const nodemon = require('nodemon');

//para garantir que os modulos serão utilizados

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true}));
app.use(expressSanitizer());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
    secret: "projetoPw",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 600000000,
        httpOnly: true,
    }

}));

app.use(expressValidator());
app.use(function(req, res, next) {
    // check if session exists
    if (global.sessData === undefined) {
      global.sessData = req.session;                        
      global.sessData.ID = req.sessionID;
      console.log('Sessão associada à variavel');
    }
    else { // yes, cookie was already present
      console.log('A sessão existe!', global.sessData.ID);
    }
    next();
});

//fazer depois de ter o passport

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./routes/auth.route.js')(app, passport);
require('./config/passport/passport.js')(passport, models.user);
//Sync Database

models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});
app.use('/', router);



module.exports = app; 