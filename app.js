let currentQuestion = 0;
let quizApi =
  "https://quizapi.io/api/v1/questions?apiKey=E1FE4Zmp1kcYQll969Ocsi6oGkN9vttPatRHnF9l&difficulty=medium&limit=10&category=Code";

function getQuiz() {
  let correctQuestion = 0;
  fetch(quizApi)
    .then((response) => response.json())
    .then(function (quizzes) {
      renderQuiz(quizzes);
      const submitButton = document.querySelector("button");
      submitButton.addEventListener("click", function () {
        const answer = getSelected();
        if (answer && answer === quizzes[currentQuestion].correct_answer) {
          correctQuestion++;
        }
        currentQuestion++;
        console.log(correctQuestion);
        if (currentQuestion < quizzes.length) {
          renderQuiz(quizzes);
        } else {
          const container = document.querySelector(".quiz-container");
          container.innerHTML = `<h2 style="color:red">You have finished the quiz with the result ${correctQuestion}/${quizzes.length}</h2>
          <button onClick="location.reload()">Reload</button>`;
        }
      });
    });
}
getQuiz();
// renderQuiz(quizData);

function renderQuiz(quizzes) {
  const questionList = document.querySelector(".quiz-header");
  let question = quizzes[currentQuestion];
  let html = `<h2>${question.question}</h2>
   <ul>
        <li>
          <input type="radio" id="answer_a" name="answer" value="answer_a" />
          <label for="answer_a">${question.answers.answer_a}</label><br />
        </li>
        <li>
          <input type="radio" id="answer_b" name="answer" value="answer_b" />
          <label for="answer_b">${question.answers.answer_b}</label><br />
        </li>
        <li>
          <input type="radio" id="answer_c" name="answer" value="answer_c" />
          <label for="answer_c">${question.answers.answer_c}</label>
        </li>
        <li>
          <input type="radio" id="answer_d" name="answer" value="answer_d" />
          <label for="answer_d">${question.answers.answer_d}</label>
        </li>
      </ul>`;
  questionList.innerHTML = html;
}
function getSelected() {
  const answerElement = document.querySelector('input[name="answer"]:checked')
    .id;
  return answerElement;
}
