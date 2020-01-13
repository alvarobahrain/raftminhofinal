window.onload = function() {
    this.readActivities();
}

let txt="";
let divAct = document.getElementById('divAct');

function readActivities() {
    async function fetchAsync() {

        const response = await fetch('https://raftminho.herokuapp.com/activities');
        const acts = await response.json();
        let dateToday =  Date.now()

        for(const act of acts) {
            let dateAct = Date.parse(act.data_inicio);
            let idSpace = act.id_Espaco;

            const response4 = await fetch(`https://raftminho.herokuapp.com/spaces/${idSpace}`);
            const spaces = await response4.json();

            const space = spaces[0];

            const local = space.localizacao;

            if(dateToday<dateAct) {

                txt+='<div class="card"> <div class="card-header"><h5 class="card-title" style="text-align:center">Nome da Atividade: ' +  act.nome_atividade + '</h5></div>';
                txt+='<div class="card-body"> <h5 class="card-title">Local: <p class="card-text">'+local+'</p></h5>';
                txt += '<h5 class="card-title">Inicio:  <p class="card-text">'+ act.data_inicio +'</p></h5> <h5 class="card-title">Fim: ';
                txt += '<p class="card-text">'+ act.data_fim +'</p>';
                txt += '<h5 class="card-title">Custo:  <p class="card-text">'+ act.custo +'</p></h5>'
                txt += '</div></div><br>'

            }
        }

        divAct.innerHTML = txt;
    }
    fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}