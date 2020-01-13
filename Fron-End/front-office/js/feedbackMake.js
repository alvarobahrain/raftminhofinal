window.onload = function() {
    showFeedback();
}

    let createFeedback = document.getElementById('enviar');
    let divisaoFeedBack = document.getElementById("commentSection");
    const idUser = getCookie('id');

   
   

    createFeedback.addEventListener("click", async (event) => {
        event.preventDefault();
        const txtComment = document.getElementById('feedback').value;
        
        if(txtComment.value === "") {
            alert('Escreva um comentário!!!');
        }else {
            const response = await fetch(`https://raftminho.herokuapp.com/feedbacks/${idUser}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "PUT",
                body: `feed=${txtComment}`
            }).then(function (response) {
                if (!response.ok) {
                console.log(response.status); //=> number 100–599
                console.log(response.statusText); //=> String
                console.log(response.headers); //=> Headers
                console.log(response.url); //=> String
                } else {
                alert("Feedback efetuado com sucesso!");
                showFeedback(); 
                }
                
        }).catch(function (err) {alert("Erro: Ocorreu um erro no envio do seu feedback!"); console.error(err);
    })
}
});

const showFeedback = async () => {
    //divisaoFeedBack.reset();
    //divisaoFeedBack.innerHTML = "";
    let date = new Date().toLocaleString();
    const response = await fetch(`https://raftminho.herokuapp.com/feedbacks/${idUser}`);
    const users = await response.json();

    const user = users[0];

        divisaoFeedBack.innerHTML ='<li class="media">' +
                                  '<div class="media-body">' +
                                      '<span class="text-muted pull-right">' +
                                          '<small class="text-muted">' + date + '</small>' +
                                      '</span>' + 
                                      '<strong class="text-success">'+idUser+'</strong>' +
                                      '<p>'
                                          + user.feed +
                                      '</p>' +
                                  '</div>' +
                              '</li>' +
                              divisaoFeedBack.innerHTML;
        
        
    
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

