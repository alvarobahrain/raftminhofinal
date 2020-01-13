module.exports = {

    bd: {
        noRecords: {
        msg: "No records found",
        message: {
            pt: "Não foram encontrados dados!",
            eng: "No records found"
        },
        status: 404,
        success: false
    },

    bdError: {
        msg: "Error",
        message: {
            pt: "Os dados que inseriu são inválidos!!",
            eng: "Invalid data"
        },
        success : false,
        status: 400,
    },

    updateBemSucedido: {
        msg: "success",
        message: {
            pt: "Dados alterados com sucesso!",
            eng: "Records updated with success"
        },
        success: true,
        status:200,
    },

    insertBemSucedido: {
        msg: "success",
        message: {
            pt: "Dados inseridos com sucesso!",
            eng: "Records inserted with success"
        },
        success: true,
        status: 201,
    },

    deleteBemSucedido: {
        msg: "success",
        message: {
            pt: "Dados apagados com sucesso",
            eng: "Records deleted with success"
        },
        success: true,
        status: 200
    },

    usernameDuplicado: {
        msg: "usernameDuplicated",
        message: {
            pt: "O seu username ja se encontra registrado",
            eng: "Username already registered"
        },
        success: false,
        err_code: 1,
        err_message: "Usename já existente",
        status: 409, 
        
    },

    requiredData: {
        msg: "dataMissing",
        message: {
            pt: "Falta preencher dados obrigatórios",
            eng: "Required fields are missing"
        },
        success: false,
        status: 400,
    },


},

};