const mysql = require('mysql');

const con = mysql.createConnection ({  //cria a conecção
host: 'lhcp1059.webapps.net',
user: 'pn1yme2p_rafting',
password: 'rafting2019',
database: 'pn1yme2p_rafting'
});


module.exports = con;  //exporta

