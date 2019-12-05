const btnStart = document.querySelector('#start-btn');
const btnNext = document.querySelector('#next-btn');
const questionContainerElement = document.querySelector('#question-container');
let shuffledQuestion, currentQuestionIndex;
const questionElement = document.querySelector('#question');
const answerElement = document.querySelector('#answer-buttons');
btnStart.addEventListener('click', startGame);
btnNext.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})
function startGame() {
    btnStart.classList.add('hide');
    shuffledQuestion = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerElement.appendChild(button);
    });
}
function resetState() {
    clearStatusClass(document.body);
    btnNext.classList.add('hide');
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
}
function selectAnswer(e) {
    const selectButton = e.target;
    const correct = selectButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestion.length > currentQuestionIndex + 1) {
        btnNext.classList.remove('hide');
    } else {
        btnStart.innerText = 'Restart';
        btnStart.classList.remove('hide');
    }
}
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}
const questions = [
    {
        question: 'What is 2 + 2?',
        answer: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },

    {
        question: 'Who is Bao?',
        answer: [
            { text: 'Developer', correct: true },
            { text: 'Pilot', correct: false }
        ]
    },

    {
        question: 'What is 4 * 2?',
        answer: [
            { text: '10', correct: false },
            { text: '8', correct: true }
        ]
    },

]