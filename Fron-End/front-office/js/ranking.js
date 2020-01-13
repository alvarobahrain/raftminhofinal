window.onload = function() {
    globalRanking();
} 
    
    function globalRanking()  {
        async function fetchAsync() {
            const tableRanking = document.getElementById('tabela-ranking');
            let txt="";
            let cont=1;
            const response = await fetch('https://raftminho.herokuapp.com/rankings');
            const users = await response.json();

            txt+=''
        
            for(const user of users) {
                txt+='<div class="card"><div class="card-header">'+ '<h5 class="card-title" style= "text-align: center;">'+cont+'ª Posição: '+''+ user.Nome_Participante +'</h5></div>'
                txt+='   <h5 class="card-title">Pontuação:</h5><p class="card-text">'+ user.Pontuacao_Participante +'</p></div></div>';
                txt+='<br>'
                cont++;
            }

        tableRanking.innerHTML = txt;
        }
        fetchAsync().then(data => console.log('ok')).catch(reason => console.log(reason.message));
    } 

