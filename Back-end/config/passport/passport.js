const bcrypt = require('bcryptjs');
const jsonMessagesPath = __dirname + "/../../assets/jsonMessages/";
var jsonMessages = require(jsonMessagesPath + "login");
const cookies = require('../../functionsCookies');

//Estrategia do passport
module.exports = function(passport, user) {
   //Criação de uma variavel User com todos os dados do modelo user
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function(user, done) {
        done(null, user.Email);
}) ;

//Verificar se o modelo user existe
passport.deserializeUser(function(id, done) { //ALTERAR ISTO
    User.findById(id).then(function(user) {
        if(user) {
            done(null, user.get());
        }
        else {
            done(user.errors, null);
        }
        
    });
});
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
 function(req, Email, Password, done) {
    var generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
     };
     User.findOne({ where: { Email: Email} }).then(function(user) {
        if (user) {
            return done(null, false, jsonMessages.user.duplicado);
        }
        else {
            const userPassword = generateHash(Password);
            const data = {
                Email: Email,
                password: userPassword,
                id_tipo: req.body.tipo
            }; 
            User.create(data).then(function(newUser, created) {
                if (!newUser) {
                    return done(null, false);
                }
                if (newUser) {
                    return done(null, newUser);
                }
            });
        
        
        }

     });
 }
));

//Local signin
    passport.use('local.signin', new LocalStrategy ( {
        usernameField: 'email' ,
        passwordField: 'password',
        passReqToCallback: true 
    },

    function(req, email, password, done) {
        var User=user;
        const isValidPassword = function(userpass, password) {
            return bcrypt.compareSync(password, userpass);
        }
        User.findOne({ where: { Email: email} }).then(function(user) {
            if(!user) {
                return done(null, false, jsonMessages.user.username);
            }
            if(!isValidPassword(user.password, password)){
                return done(null, false, jsonMessages.user.password);
            }
            var userinfo = user.get();
            console.log(userinfo);
            
            return done(null, userinfo);
        }).catch(function(err) {
            console.log("ERROR:", err);
            return done(null, false, jsonMessages.user.erro);
        });
    }
    ));

}