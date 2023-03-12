const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const alternativas = ["a", "b", "c", "d"];
let pontuacao = 0;
let perguntaAtual = 0;

// Perguntas
const questions = [
  {
    question: "PHP foi desenvolvido para qual fim?",
    answers: [
      {
        answer: "back-end",
        correct: true,
      },
      {
        answer: "front-end",
        correct: false,
      },
      {
        answer: "Sistema operacional",
        correct: false,
      },
      {
        answer: "Banco de dados",
        correct: false,
      },
    ],
  },
  {
    question: "Uma forma de declarar variável em JavaScript:",
    answers: [
      {
        answer: "$var",
        correct: false,
      },
      {
        answer: "var",
        correct: true,
      },
      {
        answer: "@var",
        correct: false,
      },
      {
        answer: "#let",
        correct: false,
      },
    ],
  },
  {
    question: "Qual o seletor de id no CSS?",
    answers: [
      {
        answer: "#",
        correct: true,
      },
      {
        answer: ".",
        correct: false,
      },
      {
        answer: "@",
        correct: false,
      },
      {
        answer: "/",
        correct: false,
      },
    ],
  },
];

// Função que inicia o jogo
function init() {
  createQuestion(0);
}

function createQuestion(i) {
  // i = 0
  // limpar a questão anterior
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach(function (btn) {
    btn.remove();
  });

  // Alterar o texto da pergunta
  const questionText = question.querySelector("#question-txt");
  const questionNumber = question.querySelector("#question-number");

  questionText.innerText = questions[i].question;
  questionNumber.innerText = i + 1;

  // Criar o template do botão do quizz
  questions[i].answers.forEach(function (answer, i) {
    const answerTemplate = document
      .querySelector(".answer-template")
      .cloneNode(true);

    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerTxt = answerTemplate.querySelector(".question-answer");

    letterBtn.innerText = alternativas[i];
    answerTxt.innerText = answer.answer;

    answerTemplate.setAttribute("correct-answer", answer.correct);

    // Remover o hide e answer template class
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    // inserindo a pergunta no answersbox
    answersBox.appendChild(answerTemplate);

    // Inserindo evento de click no botão
    answerTemplate.addEventListener("click", function () {
      checkAnswer(answerTemplate);
    });
  });

  // Incrementando a pergunta atual
  perguntaAtual++;
}

// Verificando a resposta do usuário
function checkAnswer(btn) {
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function (button) {
    if (button.getAttribute("correct-answer") == "true") {
      button.classList.add("correct-answer");

      // Checa se o usuário acertou a perguntou
      if (btn == button) {
        pontuacao++;
      }
    } else {
      button.classList.add("wrong-answer");
    }
  });

  nextQuestion();
}

function nextQuestion() {
  setTimeout(function () {
    // Verifica se ainda há pergunta na lista
    if (perguntaAtual >= questions.length) {
      // apresenta a mensagem de sucesso
      showResult();
      return;
    }
    createQuestion(perguntaAtual);
  }, 700);
}

function showResult() {
  hideOrShowQuizz();

  // calcular a pontuação
  const score = ((pontuacao / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score");
  displayScore.innerText = score + "%";

  // Alterar o número de respostas corretas
  const correctAnswers = document.querySelector("#correct-answers");
  correctAnswers.innerText = pontuacao;

  const qtd = document.querySelector("#questions-qtd");
  qtd.innerText = questions.length;
}

function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

// Reiniciar o quizz
const restart = document.querySelector("#restart");

restart.addEventListener("click", function () {
  pontuacao = 0;
  perguntaAtual = 0;
  hideOrShowQuizz();
  init();
});

init();
