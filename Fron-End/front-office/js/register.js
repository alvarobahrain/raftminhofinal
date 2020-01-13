let isNew = true;

window.onload = () => {
    const formRegister= document.getElementById("formNewUser");

    formRegister.addEventListener("submit", async (event) => {
        event.preventDefault()
        const txtName = document.getElementById("text1").value;
        const txtEmail = document.getElementById("exampleInputEmail1").value;
        const txtDate = document.getElementById("text2").value;
        let txtPass = document.getElementById("exampleInputPassword1").value;
        let txtrepPass = document.getElementById("exampleInputPassword2").value;
        const txtMorada = document.getElementById("morada").value;

        if(txtPass !== txtrepPass){
            alert("Passwords não coincidem!!")
            txtrepPass="";
            txtPass="";
        } else {
            let response;
            if(isNew){
                
                response= await fetch("http://localhost:3000/participants", {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST",
                    body: `Nome_Participante=${txtName}&Email=${txtEmail}&Password=${txtPass}&Localidade=${txtMorada}&idade=${txtDate}`
                })
            }

        alert('Registado com sucesso! Pode efetuar o seu login agora');
        formRegister.reset();
        window.location.href= 'Login.html';
        }
    })
}