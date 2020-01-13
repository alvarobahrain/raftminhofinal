window.onload = () => {
    readHistoric();
}

let txt="";
const idUser = getCookie('id')

function readHistoric() {
    async function fetchAsync() {
     const tableHistoric = document.getElementById('cardHistoric');  //id da <div>
     let pontuação = 0;
     
     const allPastActivities= [];  //vai guardar dentro de um array todas as atividades que o utilizador já efetuou
     const activityScore = [];


         const response1 = await fetch(`http://localhost:3000/participants/${idUser}/teams`);
         const teams = await response1.json();

         for(const team of teams) {
             const idTeam = team.Id_Equipa;
                 const response2 = await fetch(`http://localhost:3000/teams/${idTeam}/registers`);//devolve as atividade que a equipa do utilizador logado participou 
                 //para depois verificar se essa atividade ainda esta para vir ou se ja passou
                 const activities = await response2.json();
                 let date1 =  Date.now()
                 console.log(date1);

                 for(const activity of activities) {
                     let date = Date.parse(activity.data_fim);
                     console.log(date);
                     if(date < date1){
                         const idActivity = activity.Id_Atividade;
                         console.log(idActivity);
                         allPastActivities.push(idActivity);
                         activityScore.push(team.Pontuacao);
                     }
                 
             
         }

     }
     if(allPastActivities.length == 0) {
        txt += '<br><br><br><br><br><h1>Não possui atividades realizadas! </h1><p>Para se inscrever em novas atividades clique <a href=Inscricao.html>aqui</a></p>'
     }else {

        
     let cont=0;
    for(let i=0;i<allPastActivities.length; i++) {
        console.log(allPastActivities.length); //2
        console.log(allPastActivities);
        let ppp = allPastActivities[i];
        let pont = activityScore[i];

        console.log(activityScore) // [0,0]

        const response3 = await fetch(`http://localhost:3000/activities/${ppp}`);
        const acts = await response3.json();

        console.log(acts);

        

        for(const act of acts) {

            console.log(act);
            const idSpace = act.id_Espaco; //ERRO FALTA O NOME DO LOCAL(ROTAS E CONTROLLERS DE ESPAÇO)

            const response4 = await fetch(`http://localhost:3000/spaces/${idSpace}`);
            const spaces = await response4.json();

            const space = spaces[0];

            const local = space.localizacao;
            
            
            txt+='<div class="card"> <div class="card-header"><h5 class="card-title" style="text-align:center">Nome da Atividade: ' +  act.nome_atividade + '</h5></div>';
            txt+='<div class="card-body"> <h5 class="card-title">Local: <p class="card-text">'+local+'</p></h5>';
            txt += '<h5 class="card-title">Inicio:  <p class="card-text">'+ act.data_inicio +'</p></h5> <h5 class="card-title">Fim: ';
            txt += '<p class="card-text">'+ act.data_fim +'</p></h5> <h5 class="card-title">Pontuação:  <p class="card-text">'+pont+'</p></h5> </div>';
            txt += '</div><br>'
        }

        
        tableHistoric.innerHTML = txt;
        cont++;
    }
    console.log(cont);
        tableHistoric.innerHTML = txt;
}
}
fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }



