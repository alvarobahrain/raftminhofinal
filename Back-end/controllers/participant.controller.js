const connect = require ('../config/conectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) { //funciona
    //criar e executar a query de leitura na base de dados
    const query = connect.query('SELECT b.pass, a.idade, a.Id_Participante, b.Email, a.Nome_Participante, a.Localidade, a.Registo FROM participante a, login b WHERE a.email = b.email ORDER BY Id_Participante desc' , function(err, rows, fields) {
        console.log(query.sql);
        if(err) {
            console.log(err);
            res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.bd.noRecords.status).send(jsonMessages.bd.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

function readID(req, res) {   //funciona
    const idParticipante = req.sanitize('id').escape();
    const post = { Id_Participante : idParticipante };
    const query = connect.query('SELECT b.pass, a.Id_Participante, a.idade, a.Nome_Participante, b.Email, a.Localidade, a.Registo FROM participante a, login b WHERE a.email = b.email AND ?', post, function(err, rows, fields) {
        if(err) {
            console.log(err);
            res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
        }else {
            if(rows.length==0) {
                res.status(jsonMessages.bd.noRecords.status).send(jsonMessages.bd.noRecords);
            }else {
                res.send(rows);
            }
        }
   
    })
}

function save(req, res) {  //funciona
    //receber os dados do formuário que são enviados por post
    const Nome_Participante = req.sanitize('Nome_Participante').escape();
    const Email = req.sanitize('Email').escape();
    const Password = req.sanitize('Password').escape();
    const Localidade = req.sanitize('Localidade').escape();
    const idade = req.sanitize('idade').escape();
    req.checkBody("Nome_Participante", "Insira apenas texto").isAlpha();
    req.checkBody("Email", "Insira um email válido").isEmail();
    req.checkBody("Password", "Inserir uma password válida").isAlpha();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        if (Nome_Participante != "NULL" && Email != "NULL" && typeof(Nome_Participante) != "undefined" && Password != "NULL" && typeof(Password)) {
            const post = { 
                Nome_Participante : Nome_Participante, 
                Email: Email, 
                idade:idade,
                Id_Participante : Email, 
                Localidade: Localidade,
             };

             const post1 = {
                id_tipo: 5,
                email: Email,
                pass: Password
             }

            //gravar a informação no login em primeiro lugar
            const query1 = connect.query('INSERT INTO login SET ?', post1, function(err, rows, fields){
                 console.log(query1.sql);
                 if(!err) {
                     //res.status(jsonMessages.bd.insertBemSucedido.status).location(rows.insertId).send(jsonMessages.bd.insertBemSucedido);
                     console.log('Dados inseridos com sucesso!!');
                     const query = connect.query('INSERT INTO participante SET ?', post, function(err, rows, fields) {
                        console.log(query.sql);
                        if (!err) {
                            res.status(jsonMessages.bd.insertBemSucedido.status).location(rows.insertId).send(jsonMessages.bd.insertBemSucedido);
                            console.log('Insert bem Sucessido!');
                        }
                        else {
                            console.log(err);
                            res.send(jsonMessages.bd.bdError);
                        }
                    });
                 }else {
                     console.log(err);
                     res.send(jsonMessages.bd.bdError);
                 }
             });
        }
        else

            res.status(jsonMessages.bd.requiredData.status).send(jsonMessages.bd.requiredData);
    }
}

function update(req, res) {    //funciona
    const Nome_Participante = req.sanitize('Nome_Participante').escape();
    const Id_Participante = req.sanitize('id').escape();
    const Password = req.sanitize('Password').escape();
    const Localidade = req.sanitize('Localidade').escape();
    const Email = req.sanitize('Email').escape();
    const idade = req.sanitize('idade').escape();
    req.checkBody("Nome_Participante", "Inserir apenas caracteres de texto").isAlpha();
    req.checkParams("id", "Insira um ID de equipa válido").isEmail();
    req.checkBody("Email", "Insira um email válido").isEmail();
    req.checkBody("Password", "Inserir uma password válida").isAlpha();
    const errors = req.validationErrors();

    if(errors) {
        res.send(errors);
        return;
    }else {
        if(Nome_Participante != "NULL" && typeof(Nome_Participante) != "undefined" && Password != "NULL" && typeof(Password) && typeof(Email) != "undefined" && Email != "NULL") {
            const update = [
                Nome_Participante,
                Localidade,
                Email,
                idade,
                Email,
                Id_Participante
            ];

            const update1 = [
                Email,
                Password,
                Id_Participante    
            ]
            const query1 = connect.query('UPDATE login SET email = ?, pass = ? WHERE email = ?', update1, function(err, rows, fields) {

                if(!err) {
                    console.log(query1.sql);
                    //res.status(jsonMessages.bd.updateBemSucedido.status).send(jsonMessages.bd.updateBemSucedido);
                    console.log('funciona');
                    const query = connect.query('UPDATE participante SET Nome_Participante = ?, Localidade = ?, email = ?, idade = ?, Id_Participante =? WHERE Id_Participante = ?', update, function(err, rows, fields) {
                        console.log(query.sql);
                        if(!err) {
                            res.status(jsonMessages.bd.updateBemSucedido.status).location(rows.insertId).send(jsonMessages.bd.updateBemSucedido);
                            //console.log('update bem sucedido');
                        } else {
                            console.log(err);
                            res.send(jsonMessages.bd.bdError);
                        }
                    })
                }else {
                    console.log(err);
                    res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
                }

            })
        }
        else {
            res.status(jsonMessages.bd.requiredData.status).send(jsonMessages.bd.requiredData);
        }
     

    }
}

function readTeams(req, res) {
    const idpart = req.sanitize('id').escape();
    const post = { Id_Participante: idpart };
    const query = connect.query('SELECT distinct p.Id_Equipa, p.Nome, p.nr_elementos, e.Pontuacao, e.Participacao, e.Capitao FROM equipa_participante e, equipa p where e.Id_Equipa = p.Id_Equipa AND ? order by Id_Equipa desc', post, function(err, rows, fields) {
        console.log(query.sql);
        if (err) {
            console.log(err);
            res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
        }
        else {
            if (rows.length == 0) {
                res.status(jsonMessages.bd.noRecords.status).send(jsonMessages.bd.noRecords);
            }
            else {
                res.send(rows);
            }
        }
    });
}

//exportar as funções
module.exports = {
    read: read,
    readID: readID,
    save: save,
    update: update,
    readTeams: readTeams
};

    
