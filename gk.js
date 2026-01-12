$(document).ready(function() {
    const quizQuestions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Rome"],
            answer: "Paris"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Saturn", "Jupiter", "Uranus"],
            answer: "Jupiter"
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Ag", "Au", "Hg", "Pb"],
            answer: "Au"
        },
        {
            question: "Who painted the famous painting 'The Starry Night'?",
            options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
            answer: "Vincent van Gogh"
        },
        {
            question: "What is the largest mammal on Earth?",
            options: ["Blue whale", "Fin whale", "Humpback whale", "Sperm whale"],
            answer: "Blue whale"
        },
        {
            question: "What is the smallest country in the world?",
            options: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
            answer: "Vatican City"
        },
        {
            question: "Who wrote the famous novel 'To Kill a Mockingbird'?",
            options: ["F. Scott Fitzgerald", "Harper Lee", "Jane Austen", "J.K. Rowling"],
            answer: "Harper Lee"
        },
        {
            question: "What is the highest mountain peak in the solar system?",
            options: ["Mount Everest", "K2", "Kilimanjaro", "Olympus Mons"],
            answer: "Olympus Mons"
        },
        {
            question: "What is the largest living structure on Earth?",
            options: ["The Great Barrier Reef", "The Amazon Rainforest", "The Grand Canyon", "The Great Wall of China"],
            answer: "The Great Barrier Reef"
        },
        {
            question: "Who was the first president of the United States?",
            options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Franklin D. Roosevelt"],
            answer: "George Washington"
        }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = new Array(quizQuestions.length).fill(null);

    function displayQuestion() {
        const question = quizQuestions[currentQuestionIndex];
        let questionHTML = `
            <h2 class="text-2xl mb-2">Question ${currentQuestionIndex + 1}</h2>
            <p class="text-lg mb-4">${question.question}</p>
        `;

        question.options.forEach((option, index) => {
            questionHTML += `
                <div class="flex items-center mb-2">
                    <input class="mr-2" type="radio" name="question-${currentQuestionIndex}" value="${option}" ${userAnswers[currentQuestionIndex] === option ? 'checked' : ''}>
                    <label class="text-lg">${option}</label>
                </div>
            `;
        });

        $("#question-container").html(questionHTML);

        if (currentQuestionIndex === 0) {
            $("#prev-btn ").prop("disabled", true);
        } else {
            $("#prev-btn").prop("disabled", false);
        }

        if (currentQuestionIndex === quizQuestions.length - 1) {
            $("#next-btn").prop("disabled", true);
        } else {
            $("#next-btn").prop("disabled", false);
        }

        updateProgressBar();
    }

    function checkAnswer() {
        const userAnswer = $(`input[name="question-${currentQuestionIndex}"]:checked`).val();
        if (userAnswer) {
            userAnswers[currentQuestionIndex] = userAnswer;
            return true;
        } else {
            alert("Please select an answer");
            return false;
        }
    }

    function showNextQuestion() {
        if (checkAnswer()) {
            currentQuestionIndex++;
            displayQuestion();
        }
    }

    function showPreviousQuestion() {
        checkAnswer();
        currentQuestionIndex--;
        displayQuestion();
    }

    function submitTest() {
        checkAnswer();
        let score = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === quizQuestions[index].answer) {
                score++;
            }
        });

        $("#score").text(score);
        $("#total-questions").text(quizQuestions.length);
        $("#scoreModal").modal("show");
    }

    function resetTest() {
        currentQuestionIndex = 0;
        userAnswers = new Array(quizQuestions.length).fill(null);
        displayQuestion();
    }

    function updateProgressBar() {
        const progress = ( currentQuestionIndex + 1) / quizQuestions.length * 100;
        $("#progress-bar").css("width", `${progress}%`);
        $("#progress-bar").attr("aria-valuenow", progress);
    }

    displayQuestion();

    $("#next-btn").on("click", showNextQuestion);
    $("#prev-btn").on("click", showPreviousQuestion);
    $("#submit-btn").on("click", submitTest);
    $("#reset-btn").on("click", resetTest);
});