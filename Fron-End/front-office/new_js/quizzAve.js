(function quizz1 () {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

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

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

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

  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
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