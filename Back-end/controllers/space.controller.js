const connect = require('../config/conectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + 'bd');

function read(req, res) {
    connect.query('SELECT * FROM espaco, atividade WHERE atividade.id_Espaco = espaco.id_Espaco AND autorizado=1', function(err, rows, fields) {
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

function readID(req, res) { 
    
    const id_espaco = req.sanitize('space').escape();
    const post = { id_Espaco : id_espaco};

    const query = connect.query('SELECT * FROM espaco WHERE ? ORDER BY id_Espaco DESC', post, function(err, rows, fields) {
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

    module.exports = {
        read : read,
        readID : readID,
    }
