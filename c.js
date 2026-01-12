$(document).ready(function() {
    const quizQuestions = [
        {
            question: "What is the syntax for declaring a variable in C?",
            options: ["int x;", "float x;", "char x;", "double x;"],
            answer: "int x;"
        },
        {
            question: "What is the purpose of the #include directive in C?",
            options: ["To include a header file", "To define a function", "To declare a variable", "To include a library"],
            answer: "To include a header file"
        },
        {
            question: "What is the syntax for printing a string in C?",
            options: ["printf('Hello World');", "cout << 'Hello World';", "echo 'Hello World';", "System.out.println('Hello World');"],
            answer: "printf('Hello World');"
        },
        {
            question: "What is the purpose of the `main` function in C?",
            options: ["To define a variable", "To declare a function", "To include a header file", "To start the program execution"],
            answer: "To start the program execution"
        },
        {
            question: "What is the syntax for declaring an array in C?",
            options: ["int arr[5];", "int arr[] = {1, 2, 3, 4, 5};", "int arr[5] = {1, 2, 3, 4, 5};", "int arr[];"],
            answer: "int arr[5];"
        },
        {
            question: "What is the purpose of the `sizeof` operator in C?",
            options: ["To get the size of a variable", "To get the size of an array", "To get the size of a structure", "To get the size of a union"],
            answer: "To get the size of a variable"
        },
        {
            question: "What is the syntax for declaring a pointer in C?",
            options: ["int *ptr;", "int ptr;", "int &ptr;", "int ptr[];"],
            answer: "int *ptr;"
        },
        {
            question: "What is the purpose of the `malloc` function in C?",
            options: ["To allocate memory dynamically", "To deallocate memory dynamically", "To declare a variable", "To define a function"],
            answer: "To allocate memory dynamically"
        },
        {
            question: "What is the syntax for declaring a structure in C?",
            options: ["struct person { int age; char name[20]; };", "struct person { int age; char name[20]; } person;", "struct person { int age; char name[20]; } *person;", "struct person { int age; char name[20]; } person[];"],
            answer: "struct person { int age; char name[20]; };"
        },
        {
            question: "What is the purpose of the `free` function in C?",
            options: ["To allocate memory dynamically", "To deallocate memory dynamically", "To declare a variable", "To define a function"],
            answer: "To deallocate memory dynamically"
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