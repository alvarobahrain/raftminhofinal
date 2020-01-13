window.onload = function() {
    this.readPrecoMult();
    readPrecoCartao();
}

let botaoMultibanco = document.getElementById('multibanco');
let botaoCartao = document.getElementById('cartao');
let botaoSubmeter = document.getElementById('btn_confirmar');

let cont=0;

function readPrecoMult() {
    async function fetchAsync() {

        let montanteMulti = document.getElementById('montanteMulti');
        
        let idAct = getCookie('idActividade');
        let idTeam = getCookie('newTeam');

        const response = await fetch(`http://localhost:3000/activities/${idAct}`);
        const acts = await response.json();

        const act = acts[0];

        const custo = act.custo;

        montanteMulti.value = custo;

    }
    fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}

function readPrecoCartao() {
    async function fetchAsync() {
        let montanteCartao = document.getElementById('cc-Montante');

        let idAct = getCookie('idActividade');
        let idTeam = getCookie('newTeam');

        const response = await fetch(`http://localhost:3000/activities/${idAct}`);
        const acts = await response.json();

        const act = acts[0];

        const custo = act.custo;

        montanteCartao.value = custo;
    }
    fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}

botaoMultibanco.addEventListener("click", async (event) => {
    event.preventDefault();
    
});

botaoSubmeter.addEventListener("click", async (event) => {
    event.preventDefault();

    let idAct = getCookie('idActividade');
    let idTeam = getCookie('newTeam');

    fetch(`http://localhost:3000/teams/${idTeam}/registers/${idAct}`, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
}).then(function(response) {
    if(!response.ok) {
        alert('Erro ao efetuar o pagamento!');
    }else {
        alert('Pagamento efetuado com sucesso!');
        deleteCookie('idActividade');
        deleteCookie('newTeam');
        window.location.href = "InitialPage.html";
    }
}).then(function (result) {console.log(result);
}).catch(function (err) {alert("Submission error"); console.error(err);
});
})


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

function deleteCookie(name) { 
    setCookie(name, '', -1); 
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
