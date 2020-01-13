//controllers de signin e signout
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

function signup(req, res) {
    res.status(jsonMessages.user.duplicado.status).send(jsonMessages.user.duplicado); //duvida
}

function signupSuccess(req, res) {
    res.status(jsonMessages.user.registo_sucesso.status).send(jsonMessages.user.registo_sucesso);
}

function signin(req, res) {
    res.status(jsonMessages.user.invalido.status).send(jsonMessages.user.invalido);
}

function signinSuccess(req, res) {
    res.status(jsonMessages.user.login_sucesso.status).send(jsonMessages.user.login_sucesso);
}

function logout(req, res, err) {
    req.session.destroy(function(err) {
        if(err) {
            console.log('Erro ao fazer logout: ' + err);
            res.status(jsonMessages.user.logoutErro.status).send(jsonMessages.user.logoutErro);
        }else {
            res.status(jsonMessages.user.logoutSucesso.status).send(jsonMessages.user.logoutSucesso);
        }
    });
}

module.exports = {
    signup : signup,
    signupSuccess : signupSuccess,
    signin : signin,
    signinSuccess : signinSuccess,
    logout : logout
};