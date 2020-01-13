const connect = require('../config/conectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + 'bd');

function read(req, res) { //funciona
    const query = connect.query('SELECT data_inicio, data_fim, id_atividade, custo, nome_atividade, nr_participantes, nr_participantes_max, id_Espaco, dificuldade_atividade FROM atividade ORDER BY id_atividade DESC', function(err, rows, field) {
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

function readID(req, res) { //funciona
    const id_atividade = req.sanitize('act').escape();
    const post = { id_atividade : id_atividade };

    const query = connect.query('SELECT data_inicio, data_fim, id_atividade, custo, nome_atividade, nr_participantes, nr_participantes_max, id_Espaco, dificuldade_atividade FROM atividade WHERE ? ORDER BY id_atividade DESC', post, function(err, rows, fields) {
        
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


module.exports = {
    read : read,
    readID : readID
}