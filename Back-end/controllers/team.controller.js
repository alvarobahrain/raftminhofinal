const connect = require('../config/conectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + 'bd');
const app = require('../server');
const expressValidator = require('express-validator');
app.use(expressValidator());

function read(req, res) { //funciona
    const query = connect.query('SELECT Id_Equipa, Nome, nr_elementos FROM equipa ORDER BY Id_Equipa DESC', function(err, rows, fields) {
        console.log(query.sql);
    

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
});
}

function readID(req, res) {   //funciona
    const idTeam = req.sanitize('id').escape();
    const post = { Id_Equipa : idTeam };
    const query = connect.query('SELECT Id_Equipa, Nome, nr_elementos FROM equipa WHERE ?', post, function(err, rows, fields) {
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
   
    });
}

function save(req, res) {  //funciona
    const name = req.sanitize('name').escape();
    const nr_elementos = req.sanitize('nr_elementos').escape()
    //req.checkBody("name", "Inserir apenas caracteres de texto").isAlpha();
    const errors = req.validationErrors();

    if(errors) {
        res.send(errors);
        return;
    }else {

    if(name!= "" && typeof(name) != 'undefined') {
        const post = { Nome : name, nr_elementos : nr_elementos };
    
    const query = connect.query('INSERT INTO equipa SET ?', post, function(err, rows, fields) {
        console.log(query.sql);
        if(!err) {
            console.log(rows.insertId);
            res.status(jsonMessages.bd.insertBemSucedido.status).location(rows.insertId).send(jsonMessages.bd.insertBemSucedido);
        }else {
            res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
        }
    });
}
}
}
/*
function update(req, res) {  //funciona
    const Nome = req.sanitize('Nome').escape();
    const nr_elementos = req.sanitize('nr_elementos').escape();
    const Id_Equipa = req.sanitize('id').escape(); 
    req.checkBody("Nome", "Inserir apenas caracteres de texto").isAlpha();
    req.checkParams("id", "Insira um ID de equipa válido").isNumeric();
    const errors = req.validationErrors();

    if(errors) {
        res.send(errors);
        return;
    }else {
        if(Nome != "NULL" && typeof(Nome) != 'undefined') {
            const update = [Nome, nr_elementos, Id_Equipa];
            const query = connect.query('UPDATE equipa SET Nome = ?, nr_elementos = ? WHERE Id_Equipa=?', update, function(err, rows, fields) {

                if(!err) {
                    res.status(jsonMessages.bd.updateBemSucedido.status).send(jsonMessages.bd.updateBemSucedido);
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
}*/

function readParticipant(req, res) {  //funciona
    const idteam = req.sanitize('idteam').escape();
    const post = { Id_Equipa: idteam };
    const query = connect.query('SELECT distinct e.Id_Participante, p.Nome_Participante, p.Email, p.Localidade, p.idade, p.Registo, e.Pontuacao, e.Participacao FROM equipa_participante e, participante p where e.Id_Participante = p.Id_Participante AND ? order by Id_Participante desc', post, function(err, rows, fields) {
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

function saveParticipant(req, res) { //funciona
    //receber os dados do formulário que são enviados por post
    const Id_participante = req.sanitize('idParticipant').escape();
    const Id_equipa = req.sanitize('idteam').escape();
    req.checkParams("idParticipant", "Insira um email válido.").isEmail();
    req.checkParams("idteam", "Id tem de ser numérico").isNumeric();
    const errors = req.validationErrors();
    if (errors) {
        res.send(errors);
        return;
    }
    else {
        
        if (Id_participante != "NULL" && Id_equipa != "NULL" && typeof(Id_participante) != 'undefined' && typeof(Id_equipa) != 'undefined') {
            const post = { Id_Participante: Id_participante, Id_Equipa : Id_equipa };
            //criar e executar a query de gravação na BD para inserir os dados presentes no post
            const query = connect.query('INSERT INTO equipa_participante SET ?', post, function(err, rows, fields) {
                console.log(query.sql);
                if (!err) {
                    res.status(jsonMessages.bd.insertBemSucedido.status).send(jsonMessages.bd.insertBemSucedido);
                }
                else {
                    console.log(err);
                    if (err.code == "ER_DUP_ENTRY") {
                        res.status(jsonMessages.bd.usernameDuplicado.status).send(jsonMessages.bd.usernameDuplicado);
                    }
                    else
                        res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
                }
            });
        }
        else
            res.status(jsonMessages.bd.requiredData.status).send(jsonMessages.bd.requiredData);
    }
}

function saveRegister(req, res) { //funciona
    //receber os dados do formuário que são enviados por post
    const idTeam = req.sanitize('idteam').escape();
    const idActivity = req.sanitize('idRegister').escape();
    if (idTeam != "NULL" && idActivity != "NULL" && typeof(idTeam) != 'undefined' && typeof(idActivity) != 'undefined') {
        const post = { Id_Equipa : idTeam, Id_Atividade : idActivity};
        //criar e executar a query de gravação na BD para inserir os dados presentes no post
        const query = connect.query('INSERT INTO inscrição SET ?', post, function(err, rows, fields) {
            console.log(query.sql);
            if (!err) {
                res.status(jsonMessages.bd.insertBemSucedido.status).send(jsonMessages.bd.insertBemSucedido);
            }
            else {
                console.log(err);
                res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
            }
        });
    }
    else
        res.status(jsonMessages.bd.requiredData.status).send(jsonMessages.bd.requiredData);
}

function readRegister(req, res) { //funciona
    //criar e executar a query de leitura na BD
    const idTeam = req.sanitize('idteam').escape();
    const post = { Id_Equipa: idTeam };
    const query = connect.query('SELECT distinct i.Id_Equipa, i.Data_Inscricao, i.Id_Atividade, custo, nome_atividade, nr_participantes, nr_participantes_max, id_Espaco, dificuldade_atividade, data_inicio, data_fim FROM atividade a, inscrição i where a.Id_Atividade = i.Id_Atividade and ? order by Id_Atividade desc', post, function(err, rows, fields) {
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

function funcao(req, res) { //funciona
    //criar e executar a query de leitura na BD
    const idTeam = req.sanitize('idTeam').escape();
    const capTeam = req.sanitize('id_cap').escape();
    const capitao = req.sanitize('cap').escape();
    const put = [capitao, idTeam, capTeam ];
    const query = connect.query('UPDATE equipa_participante SET Capitao = ? WHERE Id_Equipa=? AND Id_Participante=? ', put, function(err, rows, fields) {
        console.log(query.sql);
        if(!err) {
            res.status(jsonMessages.bd.updateBemSucedido.status).send(jsonMessages.bd.updateBemSucedido);
        }else {
            console.log(err);
            res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
        }

    });
}



module.exports = {
    read : read,
    readID : readID,
    save : save,
    readParticipant : readParticipant,
    readRegister : readRegister,
    saveParticipant : saveParticipant,
    saveRegister : saveRegister,
    funcao:funcao
}