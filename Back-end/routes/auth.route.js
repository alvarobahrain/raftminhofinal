//rotas de signin e signout
var path = require('path');
const authController = require('../controllers/auth.controller');
module.exports = function(app, passport) {

    app.get('/signup', authController.signup);//rota de registo
    app.get('/signin', function(req,res) {
        //res.sendFile(path.resolve(__dirname + '/../views/front-office/Login.html'));
    },authController.signin);//rota de login

    //rotas de sucesso

    app.get('/signupSuccess', authController.signupSuccess);
    app.get('/signinsuccess', authController.signinSuccess);
    
    app.post('/signup', passport.authenticate('local.signup', {  //após a submissão do formulário, será efetuado um pedido post, se o registo
        successRedirect: '/signupSuccess', //for efetuado com sucesso, invoca o controlador de sucesso de registo
        failureRedirect: '/signup'   //não for bem efetuado, redireciona para o controlador de login
    }));

    app.get('/logout', authController.logout);   //rota de logout
    app.post('/signin', passport.authenticate('local.signin', {  //após a submissão do formulário, será efetuado um pedido post, se o login for
        successRedirect: '/signinsuccess',   //for efetuado com sucesso, invoca o controlador de sucesso de login
        failureRedirect: '/signin'           //não for bem efetuado, redireciona para o controlador de login

    }))
}