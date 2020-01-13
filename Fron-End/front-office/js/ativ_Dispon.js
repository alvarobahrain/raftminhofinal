window.onload = function() {
    this.readActivities();
}

let txt1="";
let txt2="";
let div = document.getElementById('divAct');
let botao = document.getElementById('submit');

let selectOptions = document.getElementById('inlineFormCustomSelect');

function readActivities() {
    async function fetchAsync() {

        const response1 = await fetch('http://localhost:3000/activities/3');
        const actsDouro = await response1.json();

        const actDouro = actsDouro[0];

        txt1+='<div class="card"><div class="card-header">'+ actDouro.nome_atividade +'</div><div class="card-body">';
        txt1+=' <h5 class="card-title">Data de Inicio:</h5><p class="card-text">' + actDouro.data_inicio +'</p>';
        txt1+= '<h5 class="card-title">Data de Fim:</h5><p class="card-text">' +actDouro.data_fim + '</p>'
        txt1+= '<h5 class="card-title">Custo:</h5><p class="card-text">' +actDouro.custo + '</p> <br><br>'
        //txt1+= '<input type="submit" id="btnDouro" class="btn_2" value="submeter"></div></div> <br';
        txt1+= '</div></div><br>'

        const response2 = await fetch('http://localhost:3000/activities/13');
        const actsCavado = await response2.json();

        const actCavado = actsCavado[0];

        txt1+='<div class="card"><div class="card-header">'+ actCavado.nome_atividade +'</div><div class="card-body">';
        txt1+=' <h5 class="card-title">Data de Inicio:</h5><p class="card-text">' + actCavado.data_inicio +'</p><br>';
        txt1+= '<h5 class="card-title">Data de Fim:</h5><p class="card-text">' +actCavado.data_fim + '</p>'
        txt1+= '<h5 class="card-title">Custo:</h5><p class="card-text">' +actCavado.custo + '</p> <br><br>'
        //txt1+= '<button type="submit" id="btnCavado" class="btn_2">Submeter</button></div></div> <br';
        txt1+= '</div></div><br>'

        const response3 = await fetch('http://localhost:3000/activities/10');
        const actsAve = await response3.json();

        const actAve = actsAve[0];

        txt1+='<div class="card"><div class="card-header">'+ actAve.nome_atividade +'</div><div class="card-body">';
        txt1+=' <h5 class="card-title">Data de Inicio:</h5><p class="card-text">' + actAve.data_inicio +'</p>';
        txt1+= '<h5 class="card-title">Data de Fim:</h5><p class="card-text">' +actAve.data_fim + '</p>'
        txt1+= '<h5 class="card-title">Custo:</h5><p class="card-text">' +actAve.custo + '</p> <br><br>'
        //txt1+= '<button type ="submit" id="btnAve" class="btn_2">Submeter</button></div></div> <br';
        txt1+= '</div></div><br>'

        txt2+='<option value="3">'+ actDouro.nome_atividade + '</option>';
        txt2+='<option value="13">'+ actCavado.nome_atividade + '</option>';
        txt2+='<option value="10">'+ actAve.nome_atividade + '</option>';

        selectOptions.innerHTML = txt2;

        div.innerHTML = txt1;

    }
    fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
}

botao.addEventListener("click", async (event) => {
    event.preventDefault();

    const displayOption = selectOptions.options[selectOptions.selectedIndex].value;

    if(displayOption==3) {
        setCookie('idActividade', 3, 1);
        console.log(getCookie('idActividade'));
        window.location.href = "pagamento.html";
    }else {
        if(displayOption == 13) {
            setCookie('idActividade', 13, 1);
            console.log(getCookie('idActividade'));
            window.location.href = "pagamento.html";
        }else {
            if(displayOption == 10) {
                setCookie('idActividade', 10, 1);
                console.log(getCookie('idActividade'));
                window.location.href = "pagamento.html";
            }
        }
    }
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

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

/*
const botaoDouro =document.getElementById('btnDouro');

botaoDouro.addEventListener("submit", async (event) => {
    event.preventDefault();

    window.location.href = "pagamento.html";
});

const botaoCavado = document.getElementById('btnCavado');

botaoCavado.addEventListener("click", async (event) => {
    event.preventDefault();

    window.location.href = "pagamento.html";
});

botaoAve = document.getElementById('btnAve');

botaoAve.addEventListener("click", async (event) => {
    event.preventDefault();

    window.location.href = "pagamento.html"
})*/