const questions = [
        {
            question: "What is 2 + 2?",
            answers: [
                { text: "3", correct: false },
                { text: "4", correct: true },
                { text: "5", correct: false },
                { text: "6", correct: false }
            ]
        },
        {
            question: "What is the capital of France?",
            answers: [
                { text: "Berlin", correct: false }, 
                { text: "Madrid", correct: false },
                { text: "Paris", correct: true },
                { text: "Rome", correct: false }
            ]
        },
        {
            question: "which language runs in a web browser?",
            answers: [
                { text: "java", correct: false }, 
                { text: "c", correct: false },
                { text: "javascript", correct: true },
                { text: "python", correct: false }
            ]
        },
        {
            question: "what does CSS stand for?",
            answers: [
                { text: "centralstyle sheets", correct: false }, 
                { text: "cascading style sheets", correct: true },
                { text: "cascading simple sheets", correct: false},
                { text: "cars SUVs sailboats", correct: false }
            ] 
        },
        {
            question: "who invented java and when?",
            answers: [
                { text: "Brendan Eich, 1995", correct: false }, 
                { text: "James Gosling,1991", correct: true },
                { text: "Tim Berners Lee,1989", correct: false},
                { text: "Guido van Rossum,1990", correct: false }
            ] 
        },
        {
            question: "What does HTTP stand for?",
            answers: [
                { text: "Hypertext Transit Protocol", correct: false }, 
                { text: "Hypertext Transfer Protocol", correct:  false },
                { text: "Hypertext Transmitter Protocol", correct: false},
                { text: "Hypertext Transfer Protocol", correct: true }
            ]   
        },
        {
            question: "in which year was javascript invented?",
            answers: [
                { text: "1995", correct: true}, 
                { text: "1990", correct:  false },
                { text: "2000", correct: false},
                { text: "2005", correct: false }
            ]     
        },
        {
            question: "Which HTML tag is used to define an unordered list?",
            answers: [
                { text: "<ol>", correct: false}, 
                { text: "<li>", correct:  false },
                { text: "<ul>", correct: true},
                { text: "<list>", correct: false }
            ]     
        },
        {
            question: "Which CSS unit is relative to the font-size of the element itself?",
            answers: [
                { text: "vw", correct: false}, 
                { text: "%", correct:  false },
                { text: "px", correct: false},
                { text: "em", correct: true }
            ]     
        },
        {
            question: "Which HTML tag is used to create a hyperlink?",
            answers: [
                { text: "<link", correct: false}, 
                { text: "<url>", correct:  false },
                { text: "<a>", correct: true},
                { text: "<hyperlink", correct: false }
            ]     
        }
           
       
    ];
    
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answers");
    const nextButton = document.getElementById("next-btn");
    const timerElement = document.getElementById("time");
    const scoreElement = document.getElementById("score");
    
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 30;
    let timer;
    
    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 30;
        nextButton.style.display = "none";
        scoreElement.innerText = "";
        startTimer();
        showQuestion();
    }
    
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerElement.innerText = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Time's up!");
                nextQuestion();
            }
        }, 1000);
    }
    
    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        questionElement.innerText = currentQuestion.question;
        
            currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn");
            button.addEventListener("click", () => selectAnswer(button, answer.correct));
            answerButtons.appendChild(button);
        });
    }
    
    function resetState() { 
        while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
        }
    }
    
    function selectAnswer(button, isCorrect) {
        clearInterval(timer);
        if (isCorrect) {
            button.classList.add("correct");
            score++;
        } else {
            button.classList.add("wrong");
        }
        Array.from(answerButtons.children).forEach(btn => {
            btn.disabled = true;
        });
        nextButton.style.display = "block";
    }
    
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            timeLeft = 30;
            startTimer();
            showQuestion();
        } else {
            endQuiz();
        }
    }
    
    function endQuiz() {
        clearInterval(timer);
        questionElement.innerText = "Quiz Completed!";
        answerButtons.innerHTML = "";
        scoreElement.innerText = `Your Score: ${score} / ${questions.length}`;
        nextButton.innerText = "Restart Quiz";
        nextButton.style.display = "block";
        nextButton.addEventListener("click", startQuiz);
    }
    
    nextButton.addEventListener("click", nextQuestion);
    
    startQuiz();