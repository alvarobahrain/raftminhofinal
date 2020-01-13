const router = require('express').Router();

const app = require('express');
var path = require('path');

const dir = __dirname;

const controllerParticipant = require('../controllers/participant.controller.js');
const controllerActivity = require('../controllers/activity.controller.js');
const controllerType = require('../controllers/type.controller.js');
const controllerTeam = require('../controllers/team.controller.js');
const controllerRanking = require('../controllers/ranking.controller.js');
const controllerFeedback = require('../controllers/feedback.controller.js');
const controllerSpace = require('../controllers/space.controller.js');


router.get('/', function(req, res) {   //rota raiz
    res.sendFile(path.resolve(__dirname + '/../../Fron-end/front-office/index.html'));
    
});

router.get('/initialPage', function(req, res) {
    res.sendFile(path.resolve(__dirname + '/../views/front-office/initialPage.html'));
})

router.get('/quiz', function(req, res) {
    res.send('quiz');
});

//tabela partipantes (fazer depois de ter o controller participantes)

router.get('/participants', controllerParticipant.read);
router.get('/participants/:id', controllerParticipant.readID);

router.post('/participants', controllerParticipant.save);

router.put('/participants/:id', controllerParticipant.update);

//ler as equipas do participante
router.get('/participants/:id/teams', controllerParticipant.readTeams)

//tabela tipo

router.get('/types', controllerType.read);
router.get('/types:id', controllerType.readID);//permite apenas a leitura dos tipos, a inserção ou eliminação é feita na base de dados


//tabela team

router.get('/teams', controllerTeam.read);    //ler as equipas
router.get('/teams/:id', controllerTeam.readID);


router.post('/teams', controllerTeam.save); //inserção de equipas

router.put('/teams/:idTeam/participants/:id_cap', controllerTeam.funcao);


//uma vez que uma equipa contém participantes é necessário rotas para ler, alterar e eliminar para os participantes

router.get('/teams/:idteam/participants', controllerTeam.readParticipant); //ler os elementos da equipa
router.post('/teams/:idteam/participants/:idParticipant', controllerTeam.saveParticipant); //adicionar elementos à equipa

//adicionar atividades à equipa

router.get('/teams/:idteam/registers', controllerTeam.readRegister);
router.post('/teams/:idteam/registers/:idRegister', controllerTeam.saveRegister);

//tabela atividades (outro grupo)

router.get('/activities', controllerActivity.read);
router.get('/activities/:act', controllerActivity.readID);

//rotas rankings

router.get('/rankings', controllerRanking.read); 
router.get('/rankings/:id', controllerRanking.readID);
router.put('/rankings/:id', controllerRanking.update);

//rotas feedback
router.get('/feedbacks', controllerFeedback.read);
router.get('/feedbacks/:id', controllerFeedback.readID);
router.put('/feedbacks/:id', controllerFeedback.update);

//rotas espacos
router.get('/spaces', controllerSpace.read);
router.get('/spaces/:space', controllerSpace.readID);




module.exports = router;



