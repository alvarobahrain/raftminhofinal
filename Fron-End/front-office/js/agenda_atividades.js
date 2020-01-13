window.onload = () => {
    readSchedule();
}
const idUser = getCookie('id');

function readSchedule() {
    async function fetchAsync() {
     const tableSchedule = document.getElementById('tabela-agenda');  //id da <div>
     let txt="";  //vai servir para escrever a tabela com código javascript
     const allFutureActivities= [];  //vai guardar dentro de um array todas as atividades que o utilizador já efetuou

     

         const response1 = await fetch(`http://localhost:3000/participants/${idUser}/teams`);
         const teams = await response1.json();

         for(const team of teams) {
             const idTeam = team.Id_Equipa;

                 const response2 = await fetch(`http://localhost:3000/teams/${idTeam}/registers`);//devolve as atividade que a equipa do utilizador logado participou 
                 //para depois verificar se essa atividade ainda esta para vir ou se ja passou
                 const activities = await response2.json();
                 let date =  Date.now()
                 

                 for(const activity of activities) {
                     let date1 = Date.parse(activity.data_inicio);
                     if(date1 > date){
                         const idActivity = activity.Id_Atividade;
                         allFutureActivities.push(idActivity);
                     }
                 }
             }
         

     
if(allFutureActivities.length == 0) {
    tableSchedule.innerHTML = '<br><br><br><br><br><h1>Não possui atividades por realizar!</h1><p>Para se inscrever em novas atividades clique <a href=Inscricao.html>aqui</a></p>'
}else {
    for(let i=0;i<allFutureActivities.length; i++) {
        const ppp = allFutureActivities[i];
        
        const response3 = await fetch(`http://localhost:3000/activities/${ppp}`);  
        const acts = await response3.json();

        for(let act of acts) {  

            const idSpace = act.id_Espaco; //ERRO FALTA O NOME DO LOCAL(ROTAS E CONTROLLERS DE ESPAÇO)

            console.log(idSpace)

            const response4 = await fetch(`http://localhost:3000/spaces/${idSpace}`);
            const spaces = await response4.json();

            const space = spaces[0];

            const local = space.localizacao;

            txt+='<div class="card"> <div class="card-header">'+ act.nome_atividade +'</div><div class="card-body">';
            txt+= '<h5 class="card-title">Local</h5> <p class="card-text">'+local+'</p><h5 class="card-title">Inicio</h5>';
            txt+='<p class="card-text">'+ act.data_inicio +'</p><h5 class="card-title">Fim</h5> <p class="card-text">'+ act.data_fim +'</p>';
            txt+='</div></div><br>'
        }
        
        tableSchedule.innerHTML = txt;
    }
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

