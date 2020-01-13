let isNew = true;
let newTeamID;
let participantID;


window.onload = () => {
    let b = document.getElementById("enviarBTn");
    let insertPart = document.getElementById('enviarEmail');
    let btnCap = document.getElementById("btnCap");
    let cont = 0;

    b.addEventListener("click", async (event) => {  
        event.preventDefault();
        const txtName = document.getElementById('nomeTeam').value;
        const comboBox = document.getElementById('inlineFormCustomSelect');
        const displayOption = comboBox.options[comboBox.selectedIndex].value;

    if(txtName=="" || displayOption=="escolher") {
        alert('Preencha o campo nome!!')
    }else {
        let response;
        if(isNew) {
                response = await fetch('https://raftminho.herokuapp.com/teams', {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                body: `name=${txtName}&nr_elementos=${displayOption} `
            });

            newTeamID = await response.headers.get('Location')
            setCookie('newTeam', newTeamID, 1);
            console.log(getCookie('newTeam'));
            alert('equipa criada com sucesso!');
        }
    }
    });

    insertPart.addEventListener("click", async (event) => {  //funciona
        event.preventDefault();
        
        const txtEmailUser = document.getElementById('emailElem').value;
        const IdUSER = getCookie('id');

    if(txtEmailUser=="") {
        alert('Insira um email de utilizador!!')
    }else {
        let response1;
        if(isNew) {
            response1= await fetch('https://raftminho.herokuapp.com/participants');
            users = await response1.json();

            for(const user of users) {
                if(txtEmailUser==user.Email) {
                    participantID = user.Id_Participante;
                }
            }

            response2 = await fetch(`https://raftminho.herokuapp.com/teams/${newTeamID}/participants/${participantID}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                body: `Participacao=1`
            }).then(function(response) {
                if(!response.ok) {
                    alert('Erro');
                }else {
                    if(cont==0) {
                        fetch(`https://raftminho.herokuapp.com/teams/${newTeamID}/participants/${IdUSER}`, {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            method: "POST",
                            body: `Participacao=1`
                        }).then(function(response) {
                            cont++;

                            if(!response.ok) {
                            alert('Erro');
                            }
                        })
                    }
            
                }
            })
        }
        readPartInTeam();
    }
        
    });

    btnCap.addEventListener("click", async (event) => {
        event.preventDefault();

        const txtEmailCap = document.getElementById('emailCap').value;

        if(txtEmailCap=="") {
            alert('Insira um email de utilizador válido!')
        }else {

            const response4 = await fetch(`https://raftminho.herokuapp.com/teams/${newTeamID}/participants`);
            const useers = await response4.json();

            for(const useer of useers) {
                if(useer.Id_Participante==txtEmailCap) {
                fetch(`https://raftminho.herokuapp.com/teams/${newTeamID}/participants/${txtEmailCap}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "PUT",
                    body: `cap=1`
                }).then(function(response) {
                    if(!response.ok) {
                        alert('Ocorreu um erro na inserção do email do capitão!');
                    }else {
                        alert('Update efetuado com sucesso!');
                        window.location.href= "ativ_Dispon.html";
                    }
                })
                }
            }

        }
    })

    const readPartInTeam = async () => {
        const tableUsers = document.getElementById('tabela-equipa');
        const idUSER = getCookie('id');
        let txt="";
        const response5 = await fetch(`https://raftminho.herokuapp.com/teams/${newTeamID}/participants`);
        const parts = await response5.json();

        console.log(parts)

        txt+="<table class='table table-striped' id='tabela-equipa'> <thead> <tr> <th>Email dos Elementos</th> </tr> </thead><tbody>"

        for(const part of parts) {
            txt+="<tr><td style='text-align:center'>" + part.Email + "</td></tr>";
        }

        txt+="</tbody></table>";
        tableUsers.innerHTML = txt;
    
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

      function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }

}