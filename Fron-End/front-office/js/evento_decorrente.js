window.onload = () => { 

    const botao = document.getElementById('btn_2');
    const idUser = getCookie('id');
    const contador = getCookie('cont');
    console.log(contador);

    botao.addEventListener("click", async(event) => {
        event.preventDefault();

        const response1 = await fetch(`https://raftminho.herokuapp.com/participants/${idUser}/teams`);
        const teams = await response1.json();

         for(const team of teams) {
             const idTeam = team.Id_Equipa;

                 const response2 = await fetch(`https://raftminho.herokuapp.com/teams/${idTeam}/registers`);//devolve as atividade que a equipa do utilizador logado participou 
                 //para depois verificar se essa atividade ainda esta para vir ou se ja passou
                 const activities = await response2.json();
                 let date =  Date.now()
                 

                 for(const activity of activities) {
            
                     var today = new Date();
                     var dd_today = today.getDate();
                     var mm_today = today.getMonth()+1; //JANEIRO É 0
                     var yyyy_today = today.getFullYear();

                     var data = new Date(activity.data_inicio);
                     var data_day = data.getDate();
                     var mm_day = data.getMonth()+1;
                     var yyyy_day = data.getFullYear();

                     if(contador==0) {

                     if(yyyy_today == yyyy_day) {

                        if(mm_today == mm_day) {

                            if(dd_today == data_day) {

                                window.location.href = "quizz.html";
                            }
                        }
                    }
                     }else {
                         alert('Não tem acesso a essa pagina! Não efetuou nenhuma atividade hoje ou já efetuou o quiz hoje!');
                     }

                 }
            } 
    })


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

