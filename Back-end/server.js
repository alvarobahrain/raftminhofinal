const express = require('express');
const app = express();
const con = require('./config/conectMYSQL');
const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const path = require('path');

con.connect(function(err) {
    if(!err) {
        console.log('Conectado com sucesso à base de dados!!');
    } else {
        console.log('Erro ao conectar à base de dados: '+ err);
    }
});

const cors = require("cors");
app.use(cors());
app.use(cors({
    exposedHeaders: ['Location'],
}));

app.use('/Front-End', express.static('../Fron-End/front-office/'));
app.use('/assets', express.static('assets'));
app.use('/views', express.static(path.join('./views/front-office/')));

app.listen(port, host, function(err) {

        
        con.query('SELECT * FROM tipo', function(err, rows, fields) {  //teste a ir buscar informações à tabela tipo
        
          if (!err) {
            console.log('Os dados da tabela tipo são: ', rows);
          }else{
            console.log('Erro na execução da query.');
        }
    
    });
    
   
    if(!err) {
        console.log('A app esta a funcionar no server: http://localhost:3000');
        console.log('Caso pretenda parar a execução: ctrl + c');
    }else {
        console.log('Erro ao ligar ao server: ', err)
    }

});

module.exports = app;
require('./loader.js');






