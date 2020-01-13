window.onload = () => {
    const formRegister= document.getElementById("formNewUser");

    formRegister.addEventListener("submit", async (event) => {
        
        event.preventDefault();
        const txtEmail = document.getElementById("exampleInputEmail1").value;
        let txtPassword = document.getElementById("exampleInputPassword1").value;
        let txtrepPass = document.getElementById("exampleInputPassword2").value;
        const txtName = document.getElementById("text1").value;
        const txtDate = document.getElementById("text2").value;
        const txtMorada = document.getElementById("morada").value;



        if(txtPassword != txtrepPass) {
            alert('Passwords não coincidem!');
           }else {
                fetch('http://localhost:3000/participants', {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                body: `Nome_Participante=${txtName}&Email=${txtEmail}&Localidade=${txtMorada}&idade=${txtDate}&Password=${txtPassword}`
            }).then(function(response) {
                if(!response.ok) {
                    console.log(response.status);
                    console.log(response.statusText); //=> String
                    console.log(response.headers); //=> Headers 
                    console.log(response.url); //=> String 

                    if (response.status === 409) {
                        alert("Duplicated Email");
                    }else {
                        alert('Erro!');
                    }
                }else {
                    fetch('http://localhost:3000/signup', {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        body: `email=${txtEmail}&password=${txtPassword}&tipo=5`
                    }).then(function(response) {
                        if(!response.ok) {
                        console.log(response.status);
                        console.log(response.statusText); //=> String
                        console.log(response.headers); //=> Headers 
                        console.log(response.url); //=> String 

                        if (response.status === 409) {
                            alert("Duplicated Email");
                        }else {
                            alert('Erro!');
                        }

                        }else {
                            alert('Registo efetuado com sucesso!!');
                            window.location.href= 'Login.html';
                        }
                    })
        
            }
            }).catch(function (err) {alert("Submission error"); console.error(err);
        });

        
    }

    })
}