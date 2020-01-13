const connect = require('../config/conectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

let result;

function read(req, res) { //funciona
    const query = connect.query('SELECT id_tipo, descricao FROM tipo ORDER BY id_tipo DESC', function(err, rows, fields) {
        console.log(query.sql);

        if(err) {
            console.log(err)
            res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
        }else {

            if(rows.length == 0) {
                res.status(jsonMessages.bd.noRecords.status).send(jsonMessages.bd.noRecords);
            }else {
                res.send(rows);
            }

        }
    })
}

function readID(req, res) { //funciona
    const idTipo = req.sanitize('id').escape();
    const post = { id_tipo : idTipo};

    const query = connect.query('SELECT id_tipo, descricao FROM tipo WHERE id_tipo = ? ORDER BY id_tipo DESC', post, function(err, rows, fields) {
        if(err) {
            console.log(err);
            res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
        }else {
            if(rows.length == 0) {
                res.status(jsonMessages.bd.noRecords.status).send(jsonMessages.bd.noRecords);
            }else {
                res.send(rows);
            }
        }

    })

}

module.exports = {
    read : read,
    readID : readID
}