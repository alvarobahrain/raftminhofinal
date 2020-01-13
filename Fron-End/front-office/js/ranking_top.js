window.onload = function() {
    globalRanking();
    yourRanking();
} 
    
    function globalRanking()  {
        async function fetchAsync() {
            const tableRanking = document.getElementById('tabela-ranking');
            let txt="";
            let cont = 1;
            const response = await fetch('http://localhost:3000/rankings');
            const users = await response.json();
        
            for(const user of users) {
                txt+='<div class="card"><div class="card-header">'+ '<h5 class="card-title" style= "text-align: center;">'+cont+'ª Posição: '+''+ user.Nome_Participante +'</h5></div>'
                txt+='<div class="card-body"><h5 class="card-title">Pontuação: </h5><p class="card-text">'+ user.Pontuacao_Participante +'</p></div></div>';
                txt+='<br>'

                cont++;
            }

            const idUser = getCookie('id');

            const response1 = await fetch(`http://localhost:3000/rankings/${idUser}`);
            const rankings = await response1.json();

            const ranking = rankings[0];

            const txtRanking = ranking.Pontuacao_Participante;

            txt+= '<br> <h6 style="text-align:center">A sua pontuação total é de: ' + txtRanking + '</h6><br><br>';

        tableRanking.innerHTML = txt;
        }
        fetchAsync().then(data => console.log('ok')).catch(reason => console.log(reason.message));
    }
    
    function yourRanking() {
        async function fetchAsync2() {

          const idUser = getCookie('id');
            const paragraph = document.getElementById('pontuacao');
            const response2 = await fetch(`http://localhost:3000/rankings/${idUser}`);
            const parts = await response2.json();

            const ola = getCookie('id');
            console.log(ola);

            const part = parts[0];

            const txtPontuacao = part.Pontuacao_Participante;

            paragraph.innerHTML = 'A sua pontuação é de: ' + txtPontuacao;
        }
        fetchAsync2().then(data => console.log('ok')).catch(reason => console.log(reason.message));
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


