//quando inicia a página faz
window.onload = function () {
    //chama a função para atualizar os users
    //console.log("ok");
    //adicionar função de validação ao formulário
    validator();
    document.getElementById("formNewUser").onsubmit = function (e) {
    //validação do formulário ao submeter
    //console.log("ok");
    validator();
    }};

    //função de validação
function validator() {
    let validator = new Validator(document.querySelector('form[name="formNewUser"]'), function(err, res) {
    //se validador for válido, res=true e executa o saveUsers()
    
    if (res) {
    saveUsers();
    }
    });
    
    }