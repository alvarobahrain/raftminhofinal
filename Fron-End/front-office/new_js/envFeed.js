function submeter() {
    let divisaoFeedBack = document.getElementById("commentSection");
    let feedBack = document.getElementById("feedback").value;
    let date = new Date().toLocaleString();

    if(feedback.value ===""){
        alert("Escreve um Comentário.");
    }else {
        divisaoFeedBack.innerHTML ='<li class="media">' +
                                  '<div class="media-body">' +
                                      '<span class="text-muted pull-right">' +
                                          '<small class="text-muted">' + date + '</small>' +
                                      '</span>' + 
                                      '<strong class="text-success">@Utilizador</strong>' +
                                      '<p>'
                                          + feedBack +
                                      '</p>' +
                                  '</div>' +
                              '</li>' +
                              divisaoFeedBack.innerHTML;
        document.getElementById('feedback').value='';
        document.getElementById("feedback").disabled = true;
    }
}