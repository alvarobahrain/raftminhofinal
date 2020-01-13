const connect = require ('../config/conectMYSQL');
const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "bd");

function read(req, res) { //funciona(novo)
    //criar e executar a query de leitura na base de dados
    const query = connect.query('SELECT Pontuacao_Participante, Nome_Participante, Email FROM participante ORDER BY Pontuacao_Participante DESC LIMIT 5' , function(err, rows, fields) {
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

function readID(req, res) { //funciona(novo)
    const idParticipante = req.sanitize('id').escape();
    const post = { Id_Participante : idParticipante };
    const query = connect.query('SELECT Pontuacao_Participante, Nome_Participante, Email FROM participante WHERE ?', post, function(err, rows, fields) {
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
   
    })
}
/* NÃO É NECESSÁRIO

function save(req, res) { //funciona
    const Pontuacao = req.sanitize('Pontuacao').escape();
    req.checkBody("Pontuacao", "Insira um numero").isNumeric();

    const errors = req.validationErrors();
    
    if(errors) {
        res.send(errors);
        return;
    }
    else {
        if (Pontuacao != "" ) {
            const post1 = { 
              Pontuacao_Participante : Pontuacao,   
             };
        
         //gravar a informação na equipa_participante em primeiro lugar
        const query1 = connect.query('INSERT INTO participante SET ? ', post1, function(err, rows, fields){
            console.log(query1.sql);
            if(!err) {
                
            }else {
                console.log(err);
                res.send(jsonMessages.bd.bdError);
            }
        });
   }
   else

       res.status(jsonMessages.bd.requiredData.status).send(jsonMessages.bd.requiredData);
}
}*/

function update(req, res) {  //funciona  
    const idPart = req.sanitize('id').escape();
    const Pontuacao = req.sanitize('Pontuacao').escape();
    req.checkBody("Pontuacao", "Insira um numero").isNumeric();
    
    const errors = req.validationErrors();
    
    if(errors) {
        res.send(errors);
        return;
    }else {
        if(Pontuacao != "NULL") {
            
            const update = [   
                Pontuacao ,
                idPart
               
            ];

            const query = connect.query('UPDATE participante SET Pontuacao_Participante = ? WHERE Id_Participante = ?', update, function(err, rows, fields) {
                console.log(query.sql);
                if(!err) {
                    console.log(query.sql);
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
}
        
    //exportar as funções
    module.exports = {
        read: read,
        readID: readID,
        //save: save,
        update: update
    };

    