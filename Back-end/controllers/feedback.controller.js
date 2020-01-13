const connect = require ('../config/conectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) {
    const query = connect.query('SELECT Id_Participante, Nome_Participante, feed FROM participante ORDER BY Id_Participante desc', function(err, rows, fields) {
        console.log(query.sql);

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

function readID(req, res) {
    const idUser = req.sanitize('id').escape();
    const post = { Id_Participante : idUser };

    const query = connect.query('SELECT Id_Participante, Nome_Participante, feed FROM participante WHERE ?', post, function(err, rows, fields) {
        console.log(query.sql);

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

function update(req, res) {
    const idUser = req.sanitize('id').escape();
    const feed = req.sanitize('feed').escape();
    //req.checkBody("feed", "Insira um comentário válido").isAlpha(); 
    const errors = req.validationErrors();

    if(errors) {
        res.send(errors);
        return
    }else {
        if(feed != "NULL" && typeof(feed) != 'undefined') {
            const update = [feed, idUser];
            const query = connect.query('UPDATE participante SET feed = ? WHERE Id_Participante=?', update, function(err, rows, fields) {

                console.log(query.sql);

                if(!err) {
                    res.status(jsonMessages.bd.updateBemSucedido.status).send(jsonMessages.bd.updateBemSucedido);

                }else {
                    console.log(err);
                    res.status(jsonMessages.bd.bdError.status).send(jsonMessages.bd.bdError);
                }
            })


        }else {
            res.status(jsonMessages.bd.requiredData.status).send(jsonMessages.bd.requiredData);
        }
    }

}

module.exports = {
    read: read,
    readID: readID,
    update: update
};