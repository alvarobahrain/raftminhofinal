window.onload = function() {
  this.quizCorrect();
}

let cont = 0;
let idUser = getCookie('id');
let pontuacao = 20;

function quizCorrect() {
    async function fetchAsync() {

    let div = document.getElementById('script');
    let txt='';

    let correctQuizActivity = getCookie('actQuiz');

    let response1 = await fetch(`http://localhost:3000/activities/${correctQuizActivity}`);
    let acts = await response1.json();

    let act = acts[0];
    let id_space = act.id_Espaco;

    console.log(id_space);

    let response2 = await fetch(`http://localhost:3000/spaces/${id_space}`);
    let spaces = await response2.json();

    let space = spaces[0];
    let local = space.localizacao;

    console.log(local);

    if(local=='Rio Douro') {
        (function quizz3 () {
            function buildQuiz() {
              // we'll need a place to store the HTML output
              let output = [];
          
              // for each question...
              myQuestions.forEach((currentQuestion, questionNumber) => {
                // we'll want to store the list of answer choices
                let answers = [];
          
                // and for each available answer...
                for (letter in currentQuestion.answers) {
                  // ...add an HTML radio button
                  answers.push(
                    `<label>
                      <input type="radio" name="question${questionNumber}" value="${letter}">
                      ${letter} :
                      ${currentQuestion.answers[letter]}
                    </label>`
                  );
                }
          
                // add this question and its answers to the output
                output.push(
                  `<div class="question"> ${currentQuestion.question} </div>
                  <div class="answers"> ${answers.join("")} </div>`
                );
              });
          
              // finally combine our output list into one string of HTML and put it on the page
              quizContainer.innerHTML = output.join("");
            }
          
             async function showResults() {
              // gather answer containers from our quiz
              let answerContainers = quizContainer.querySelectorAll(".answers");
          
              // keep track of user's answers
              let numCorrect = 0;
          
              // for each question...
              myQuestions.forEach((currentQuestion, questionNumber) => {
                // find selected answer
                let answerContainer = answerContainers[questionNumber];
                let selector = `input[name=question${questionNumber}]:checked`;
                let userAnswer = (answerContainer.querySelector(selector) || {}).value;
          
                var c = answerContainers[questionNumber].getElementsByTagName("label");
          
                // if answer is correct
                if (userAnswer === currentQuestion.correctAnswer) {
                  // add to the number of correct answers
                  numCorrect++;
          
                  for (var i = 0; i < c.length; i++) {
                    for (var j = 0; j < c[i].getElementsByTagName("input").length; j++) {
                      console.log(c[i].getElementsByTagName("input")[j]);
                      if(c[i].getElementsByTagName("input")[j].value == userAnswer){
                        if(userAnswer == currentQuestion.correctAnswer){
                          console.log(c[i].getElementsByTagName("input")[j].value) ; 
                        }                
          
                        c[i].style.color = "lightgreen";
                        }
                  }
                }
                  // color the answers green
                  //answerContainers[questionNumber].style.color = "lightgreen";
                } else {
          
                for (var i = 0; i < c.length; i++) {
                  for (var j = 0; j < c[i].getElementsByTagName("input").length; j++) {
                    console.log(c[i].getElementsByTagName("input")[j]);
                      if(c[i].getElementsByTagName("input")[j].value == userAnswer){
                        if(userAnswer != currentQuestion.correctAnswer){
                          console.log(c[i].getElementsByTagName("input")[j].value) ; 
                        }                
                      c[i].style.color = "red";
                      }
                }}
                  // if answer is wrong or blank
                  // color the answers red
                 // answerContainers[questionNumber].style.color = "red";
                }
              });
          
              // show number of correct answers out of total
              resultsContainer.innerHTML = 'acertou. '+`${numCorrect} out of ${myQuestions.length}`;
              let submitButton = document.getElementById("submit").remove();

              let response10 = await fetch(`http://localhost:3000/rankings/${idUser}`);
                let rankings = await response10.json();

                let ranking = rankings[0];

                let pont = ranking.Pontuacao_Participante;


                if(numCorrect==1) {
                    pontuacao += pont + 5;

                    fetch(`http://localhost:3000/rankings/${idUser}`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "PUT",
                        body: `Pontuacao=${pontuacao}`
                    }).then(function(response) {
                        if(!response.ok) {
                            alert('Erro ao atribuir a sua pontuação!!');
                        }else {
                            console.log(numCorrect);
                            alert('Pontuação atribuida com sucesso!');
                            setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                        }
                    })

                }else {
                    if(numCorrect==2) {
                        pontuacao += pont + 10;

                    fetch(`http://localhost:3000/rankings/${idUser}`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "PUT",
                        body: `Pontuacao=${pontuacao}`
                    }).then(function(response) {
                        if(!response.ok) {
                            alert('Erro ao atribuir a sua pontuação!!');
                        }else {
                            console.log(numCorrect);
                            alert('Pontuação atribuida com sucesso');
                            setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                        }
                    })
                    }else {
                        if(numCorrect==3) {
                            pontuacao += pont + 15;

                    fetch(`http://localhost:3000/rankings/${idUser}`, {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "PUT",
                        body: `Pontuacao=${pontuacao}`
                    }).then(function(response) {
                        if(!response.ok) {
                            alert('Erro ao atribuir a sua pontuação!!');
                        }else {
                            console.log(numCorrect)
                            alert('Pontuação atribuida com sucesso!');
                            setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                        }
                    })
                        }else {
                            
                                pontuacao += pont + 0;

                        fetch(`http://localhost:3000/rankings/${idUser}`, {
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            method: "PUT",
                            body: `Pontuacao=${pontuacao}`
                        }).then(function(response) {
                            if(!response.ok) {
                                alert('Erro ao atribuir a sua pontuação!!');
                            }else {
                                alert('Pontuação atribuida com sucesso!');
                                setCookie('cont',1,1);
                                deleteCookie('actQuiz');
                            }
                        });
                        
                    }
          
            }
        }
    }
          
            let quizContainer = document.getElementById("quiz");
            let resultsContainer = document.getElementById("results");
            let submitButton = document.getElementById("submit");
            let myQuestions = [
              {
                question: "Como se chama este rio?",
                answers: {
                  a: "Rio Cavado",
                  b: "Rio Douro",
                  c: "Rio Ave"
                },
                correctAnswer: "b"
              },
              {
                question: "Qual a profundidade deste rio?",
                answers: {
                  a: "300m",
                  b: "500m",
                  c: "1000m",
                  d: "700m"
                },
                correctAnswer: "c"
              },
              {
                question: "Quantos distritos atravessa est rio?",
                answers: {
                  a: "1",
                  b: "2",
                  c: "3",
                  d: "4"
                },
                correctAnswer: "c"
              },
              {
                question: "Onde é a foz deste rio?",
                answers: {
                  a: "Povoa de Varzim",
                  b: "Figueira da Foz",
                  c: "Douro",
                },
                correctAnswer: "c"
              }
            ];

            // display quiz right away
            buildQuiz();
          
            // on submit, show results
            submitButton.addEventListener("click", showResults);
        
            
          })();
        
        
    }else {
        if(local=='Rio Ave') {
            (function quizz1 () {
                function buildQuiz() {
                  // we'll need a place to store the HTML output
                  let output = [];
              
                  // for each question...
                  myQuestions.forEach((currentQuestion, questionNumber) => {
                    // we'll want to store the list of answer choices
                    let answers = [];
              
                    // and for each available answer...
                    for (letter in currentQuestion.answers) {
                      // ...add an HTML radio button
                      answers.push(
                        `<label>
                          <input type="radio" name="question${questionNumber}" value="${letter}">
                          ${letter} :
                          ${currentQuestion.answers[letter]}
                        </label>`
                      );
                    }
              
                    // add this question and its answers to the output
                    output.push(
                      `<div class="question"> ${currentQuestion.question} </div>
                      <div class="answers"> ${answers.join("")} </div>`
                    );
                  });
              
                  // finally combine our output list into one string of HTML and put it on the page
                  quizContainer.innerHTML = output.join("");
                }
              
                async function showResults() {
                  // gather answer containers from our quiz
                  let answerContainers = quizContainer.querySelectorAll(".answers");
              
                  // keep track of user's answers
                  let numCorrect = 0;
              
                  // for each question...
                  myQuestions.forEach((currentQuestion, questionNumber) => {
                    // find selected answer
                    let answerContainer = answerContainers[questionNumber];
                    let selector = `input[name=question${questionNumber}]:checked`;
                    let userAnswer = (answerContainer.querySelector(selector) || {}).value;
              
                    var c = answerContainers[questionNumber].getElementsByTagName("label");
              
                    // if answer is correct
                    if (userAnswer === currentQuestion.correctAnswer) {
                      // add to the number of correct answers
                      numCorrect++;
              
                      for (var i = 0; i < c.length; i++) {
                        for (var j = 0; j < c[i].getElementsByTagName("input").length; j++) {
                          console.log(c[i].getElementsByTagName("input")[j]);
                          if(c[i].getElementsByTagName("input")[j].value == userAnswer){
                            if(userAnswer == currentQuestion.correctAnswer){
                              console.log(c[i].getElementsByTagName("input")[j].value) ; 
                            }                
              
                            c[i].style.color = "lightgreen";
                            }
                      }
                    }
                      // color the answers green
                      //answerContainers[questionNumber].style.color = "lightgreen";
                    } else {
              
                    for (var i = 0; i < c.length; i++) {
                      for (var j = 0; j < c[i].getElementsByTagName("input").length; j++) {
                        console.log(c[i].getElementsByTagName("input")[j]);
                          if(c[i].getElementsByTagName("input")[j].value == userAnswer){
                            if(userAnswer != currentQuestion.correctAnswer){
                              console.log(c[i].getElementsByTagName("input")[j].value) ; 
                            }                
                          c[i].style.color = "red";
                          }
                    }}
                      // if answer is wrong or blank
                      // color the answers red
                     // answerContainers[questionNumber].style.color = "red";
                    }
                  });
              
                  // show number of correct answers out of total
                  resultsContainer.innerHTML = 'acertou. '+`${numCorrect} out of ${myQuestions.length}`;
                  let submitButton = document.getElementById("submit").remove();
              
                

                
              let response10 = await fetch(`http://localhost:3000/rankings/${idUser}`);
              let rankings = await response10.json();

              let ranking = rankings[0];

              let pont = ranking.Pontuacao_Participante;


              if(numCorrect==1) {
                  pontuacao += pont + 5;

                  fetch(`http://localhost:3000/rankings/${idUser}`, {
                      headers: {
                          "Content-Type": "application/x-www-form-urlencoded"
                      },
                      method: "PUT",
                      body: `Pontuacao=${pontuacao}`
                  }).then(function(response) {
                      if(!response.ok) {
                          alert('Erro ao atribuir a sua pontuação!!');
                      }else {
                          console.log(numCorrect);
                          alert('Pontuação atribuida com sucesso!');
                          setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                      }
                  })

              }else {
                  if(numCorrect==2) {
                      pontuacao += pont + 10;

                  fetch(`http://localhost:3000/rankings/${idUser}`, {
                      headers: {
                          "Content-Type": "application/x-www-form-urlencoded"
                      },
                      method: "PUT",
                      body: `Pontuacao=${pontuacao}`
                  }).then(function(response) {
                      if(!response.ok) {
                          alert('Erro ao atribuir a sua pontuação!!');
                      }else {
                          console.log(numCorrect);
                          alert('Pontuação atribuida com sucesso');
                          setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                      }
                  })
                  }else {
                      if(numCorrect==3) {
                          pontuacao += pont + 15;

                  fetch(`http://localhost:3000/rankings/${idUser}`, {
                      headers: {
                          "Content-Type": "application/x-www-form-urlencoded"
                      },
                      method: "PUT",
                      body: `Pontuacao=${pontuacao}`
                  }).then(function(response) {
                      if(!response.ok) {
                          alert('Erro ao atribuir a sua pontuação!!');
                      }else {
                          console.log(numCorrect)
                          alert('Pontuação atribuida com sucesso!');
                          setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                      }
                  })
                      }else {
                          
                              pontuacao += pont + 0;

                      fetch(`http://localhost:3000/rankings/${idUser}`, {
                          headers: {
                              "Content-Type": "application/x-www-form-urlencoded"
                          },
                          method: "PUT",
                          body: `Pontuacao=${pontuacao}`
                      }).then(function(response) {
                          if(!response.ok) {
                              alert('Erro ao atribuir a sua pontuação!!');
                              setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                          }
                      });
                      
                  }
        
          }
      }
    }
              
                let quizContainer = document.getElementById("quiz");
                let resultsContainer = document.getElementById("results");
                let submitButton = document.getElementById("submit");
                let myQuestions = [
                  {
                    question: "Como se chama este rio?",
                    answers: {
                      a: "Rio Cavado",
                      b: "Rio Douro",
                      c: "Rio Ave"
                    },
                    correctAnswer: "c"
                  },
                  {
                    question: "Qual a profundidade deste rio?",
                    answers: {
                      a: "300m",
                      b: "500m",
                      c: "1000m",
                      d: "700m"
                    },
                    correctAnswer: "b"
                  },
                  {
                    question: "Quantos distritos atravessa est rio?",
                    answers: {
                      a: "1",
                      b: "2",
                      c: "3",
                      d: "4"
                    },
                    correctAnswer: "b"
                  },
                  {
                    question: "Onde é a foz deste rio?",
                    answers: {
                      a: "Povoa de Varzim",
                      b: "Figueira da Foz",
                      c: "Douro",
                    },
                    correctAnswer: "b"
                  }
                ];
              
                // display quiz right away
                buildQuiz();
              
                // on submit, show results
                submitButton.addEventListener("click", showResults);
            
              })();
        }else {
            if(local=='Rio Cavado') {
                (function quizz2 () {
                    function buildQuiz() {
                      // we'll need a place to store the HTML output
                      let output = [];
                  
                      // for each question...
                      myQuestions.forEach((currentQuestion, questionNumber) => {
                        // we'll want to store the list of answer choices
                        let answers = [];
                  
                        // and for each available answer...
                        for (letter in currentQuestion.answers) {
                          // ...add an HTML radio button
                          answers.push(
                            `<label>
                              <input type="radio" name="question${questionNumber}" value="${letter}">
                              ${letter} :
                              ${currentQuestion.answers[letter]}
                            </label>`
                          );
                        }
                  
                        // add this question and its answers to the output
                        output.push(
                          `<div class="question"> ${currentQuestion.question} </div>
                          <div class="answers"> ${answers.join("")} </div>`
                        );
                      });
                  
                      // finally combine our output list into one string of HTML and put it on the page
                      quizContainer.innerHTML = output.join("");
                    }
                  
                    async function showResults() {
                      // gather answer containers from our quiz
                      let answerContainers = quizContainer.querySelectorAll(".answers");
                  
                      // keep track of user's answers
                      let numCorrect = 0;
                  
                      // for each question...
                      myQuestions.forEach((currentQuestion, questionNumber) => {
                        // find selected answer
                        let answerContainer = answerContainers[questionNumber];
                        let selector = `input[name=question${questionNumber}]:checked`;
                        let userAnswer = (answerContainer.querySelector(selector) || {}).value;
                  
                        var c = answerContainers[questionNumber].getElementsByTagName("label");
                  
                        // if answer is correct
                        if (userAnswer === currentQuestion.correctAnswer) {
                          // add to the number of correct answers
                          numCorrect++;
                  
                          for (var i = 0; i < c.length; i++) {
                            for (var j = 0; j < c[i].getElementsByTagName("input").length; j++) {
                              console.log(c[i].getElementsByTagName("input")[j]);
                              if(c[i].getElementsByTagName("input")[j].value == userAnswer){
                                if(userAnswer == currentQuestion.correctAnswer){
                                  console.log(c[i].getElementsByTagName("input")[j].value) ; 
                                }                
                  
                                c[i].style.color = "lightgreen";
                                }
                          }
                        }
                          // color the answers green
                          //answerContainers[questionNumber].style.color = "lightgreen";
                        } else {
                  
                        for (var i = 0; i < c.length; i++) {
                          for (var j = 0; j < c[i].getElementsByTagName("input").length; j++) {
                            console.log(c[i].getElementsByTagName("input")[j]);
                              if(c[i].getElementsByTagName("input")[j].value == userAnswer){
                                if(userAnswer != currentQuestion.correctAnswer){
                                  console.log(c[i].getElementsByTagName("input")[j].value) ; 
                                }                
                              c[i].style.color = "red";
                              }
                        }}
                          // if answer is wrong or blank
                          // color the answers red
                         // answerContainers[questionNumber].style.color = "red";
                        }
                      });
                  
                      // show number of correct answers out of total
                      resultsContainer.innerHTML = 'acertou. '+`${numCorrect} out of ${myQuestions.length}`;
                      const submitButton = document.getElementById("submit").remove();

                        
                      let response10 = await fetch(`http://localhost:3000/rankings/${idUser}`);
                      let rankings = await response10.json();

                      let ranking = rankings[0];

                      let pont = ranking.Pontuacao_Participante;


              if(numCorrect==1) {
                  pontuacao += pont + 5;

                  fetch(`http://localhost:3000/rankings/${idUser}`, {
                      headers: {
                          "Content-Type": "application/x-www-form-urlencoded"
                      },
                      method: "PUT",
                      body: `Pontuacao=${pontuacao}`
                  }).then(function(response) {
                      if(!response.ok) {
                          alert('Erro ao atribuir a sua pontuação!!');
                      }else {
                          console.log(numCorrect);
                          alert('Pontuação atribuida com sucesso!');
                          setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                      }
                  })

              }else {
                  if(numCorrect==2) {
                      pontuacao += pont + 10;

                  fetch(`http://localhost:3000/rankings/${idUser}`, {
                      headers: {
                          "Content-Type": "application/x-www-form-urlencoded"
                      },
                      method: "PUT",
                      body: `Pontuacao=${pontuacao}`
                  }).then(function(response) {
                      if(!response.ok) {
                          alert('Erro ao atribuir a sua pontuação!!');
                      }else {
                          console.log(numCorrect);
                          alert('Pontuação atribuida com sucesso');
                          setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                      }
                  })
                  }else {
                      if(numCorrect==3) {
                          pontuacao += pont + 15;

                  fetch(`http://localhost:3000/rankings/${idUser}`, {
                      headers: {
                          "Content-Type": "application/x-www-form-urlencoded"
                      },
                      method: "PUT",
                      body: `Pontuacao=${pontuacao}`
                  }).then(function(response) {
                      if(!response.ok) {
                          alert('Erro ao atribuir a sua pontuação!!');
                      }else {
                          console.log(numCorrect)
                          alert('Pontuação atribuida com sucesso!');
                          setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                      }
                  })
                      }else {
                          
                              pontuacao += pont + 0;

                      fetch(`http://localhost:3000/rankings/${idUser}`, {
                          headers: {
                              "Content-Type": "application/x-www-form-urlencoded"
                          },
                          method: "PUT",
                          body: `Pontuacao=${pontuacao}`
                      }).then(function(response) {
                          if(!response.ok) {
                              alert('Erro ao atribuir a sua pontuação!!');
                          }else {
                            alert('Pontuação atribuida com sucesso!');
                            setCookie('cont',1,1);
                            deleteCookie('actQuiz');
                          }
                      });
                      
                  }
        
          }
      }
    }
           
                  
                    
                  
                    let quizContainer = document.getElementById("quiz");
                    let resultsContainer = document.getElementById("results");
                    let submitButton = document.getElementById("submit");
                    let myQuestions = [
                      {
                        question: "Como se chama este rio?",
                        answers: {
                          a: "Rio Cavado",
                          b: "Rio Douro",
                          c: "Rio Ave"
                        },
                        correctAnswer: "a"
                      },
                      {
                        question: "Qual a profundidade deste rio?",
                        answers: {
                          a: "300m",
                          b: "500m",
                          c: "1000m",
                          d: "700m"
                        },
                        correctAnswer: "d"
                      },
                      {
                        question: "Quantos distritos atravessa est rio?",
                        answers: {
                          a: "1",
                          b: "2",
                          c: "3",
                          d: "4"
                        },
                        correctAnswer: "a"
                      },
                      {
                        question: "Onde é a foz deste rio?",
                        answers: {
                          a: "Esposende",
                          b: "Figueira da Foz",
                          c: "Douro",
                        },
                        correctAnswer: "a"
                      }
                    ];
                  
                    // display quiz right away
                    buildQuiz();
                  
                    // on submit, show results
                    submitButton.addEventListener("click", showResults);
                  })();
            }
        }
    }
}
fetchAsync().then(data => console.log("ok")).catch(reason => console.log(reason.message));
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

  function deleteCookie(name) { 
    setCookie(name, '', -1); 
}
