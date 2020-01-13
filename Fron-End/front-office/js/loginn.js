window.onload = () => {
    const formEditar= document.getElementById("formLogin");

    formEditar.addEventListener("submit", async (event) => {
        
        event.preventDefault();
        const txtEmail = document.getElementById('email').value;
        const txtPassword = document.getElementById('password').value;

        fetch('http://localhost:3000/signin', {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            body: `email=${txtEmail}&password=${txtPassword}`
        }).then(function(response) {
            if(!response.ok) {
                if(response.status === 400) {
                    alert('Email ou Password incorretos!!')
                }
    
            }else {
                
                setCookie('id', txtEmail, 1)
                setCookie('cont', 0, 1);
                console.log(getCookie('id'));
                console.log(getCookie('cont'));
                alert('Login efetuado com sucesso!!');
                window.location.href= 'InitialPage.html';
            }
        }).catch(function (err) {alert("Submission error"); console.error(err);
    })

    })
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

