$(document).ready(function() {
    const quizQuestions = [
        {
            question: "What is the syntax for printing a string in Python?",
            options: ["print('Hello World')", "console.log('Hello World')", "echo 'Hello World'", "System.out.println('Hello World')"],
            answer: "print('Hello World')"
        },
        {
            question: "What is the purpose of the `import` statement in Python?",
            options: ["To import a module", "To define a function", "To declare a variable", "To include a library"],
            answer: "To import a module"
        },
        {
            question: "What is the syntax for declaring a variable in Python?",
            options: ["int x;", "float x;", "char x;", "x = 5"],
            answer: "x = 5"
        },
        {
            question: "What is the purpose of the `def` keyword in Python?",
            options: ["To define a variable", "To declare a function", "To include a header file", "To start the program execution"],
            answer: "To declare a function"
        },
        {
            question: "What is the syntax for declaring a list in Python?",
            options: ["my_list = [1, 2, 3]", "my_list = (1, 2, 3)", "my_list = {1, 2, 3}", "my_list = {1: 2, 3: 4}"],
            answer: "my_list = [1, 2, 3]"
        },
        {
            question: "What is the purpose of the `len` function in Python?",
            options: ["To get the length of a string", "To get the length of a list", "To get the length of a tuple", "To get the length of a dictionary"],
            answer: "To get the length of a string"
        },
        {
            question: "What is the syntax for declaring a dictionary in Python?",
            options: ["my_dict = {1: 2, 3: 4}", "my_dict = [1, 2, 3]", "my_dict = (1, 2, 3)", "my_dict = {1, 2, 3}"],
            answer: "my_dict = {1: 2, 3: 4}"
        },
        {
            question: "What is the purpose of the `for` loop in Python?",
            options: ["To iterate over a list", "To iterate over a tuple", "To iterate over a dictionary", "To iterate over a string"],
            answer: "To iterate over a list"
        },
        {
            question: "What is the syntax for declaring a tuple in Python?",
            options: ["my_tuple = (1, 2, 3)", "my_tuple = [1, 2, 3]", "my_tuple = {1, 2, 3}", "my_tuple = {1: 2, 3: 4}"],
            answer: "my_tuple = (1, 2, 3)"
        },
        {
            question: "What is the purpose of the `try`/`except` block in Python?",
            options: ["To handle exceptions", "To define a function", "To declare a variable", "To include a header file"],
            answer: "To handle exceptions"
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