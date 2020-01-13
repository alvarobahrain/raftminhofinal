module.exports = {
    user: {
        duplicado: {
            msg: "DuplicateValues",
            message: {
                pt: "O seu username ja se encontra registrado!",
                eng: "Username already registered"
            },
            status: 409,
            success: false
        },

        invalido: {
            msg: "Invalid",
            message: {
                pt: "Os dados que inseriu são inválidos!",
                eng: "Invalid login"
            },
            status: 400,
            success: false
        },

        nao_autorizado: {
            msg: "unauthorized",
            message: {
                pt: "Não tem previlégios para aceder a esta rota!",
                eng: "You can not access to this route"
            },
            status: 401,
            success: false
        },

        username: {
            msg: "Invalid",
            message: {
                pt: "O username que inseriu não se encontra registrado!",
                eng: "Invalid username"
            },
            status: 400,
            success: false
        },

        password: {
            msg: "Invalid",
            message: {
                pt: "A password que inseriu é inválida!",
                eng: "Invalid password"
            },
            status: 400,
            success: false
        },

        login_sucesso: {
            msg: "Success",
            message: {
                pt: "Login com sucesso!",
                eng: "Login with success"
            },
            status: 200,
            success: true
        },

        registo_sucesso: {
            msg: "Signup Success",
            message: {
                pt: "Registo efetuado com sucesso!",
                eng: "Signup with success"
      

            },
            status: 200,
            success: false
        },

        logoutSucesso: {
            msg: "Logout success",
            message: {
                pt: "Sessão terminada com sucesso!",
                eng: "Logout with success"
            },
            status: 200,
            success: true
        },

        logoutErro: {
            msg: "Logout Error",
            message: {
                pt: "Não pode terminar sessão. Não existe nenhuma sessão ativa!",
                eng: "You cannot logout. There is no active session"
            },
            status: 400,
            success: false
        },

        erro: {
            msg: "Error",
            message: {
                pt: "Algo de errado aconteceu no processo de login!",
                eng: "Something went wrong with your Signin"
            },
            status: 503,
            success: true
        }
    }
}