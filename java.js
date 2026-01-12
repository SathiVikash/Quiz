$(document).ready(function() {
    const quizQuestions = [
        {
            question: "What is the syntax for declaring a variable in Java?",
            options: ["int x;", "float x;", "char x;", "double x;"],
            answer: "int x;"
        },
        {
            question: "What is the purpose of the `public` access modifier in Java?",
            options: ["To make a method private", "To make a method protected", "To make a method public", "To make a method static"],
            answer: "To make a method public"
        },
        {
            question: "What is the syntax for printing a string in Java?",
            options: ["System.out.println('Hello World');", "System.out.print('Hello World');", "System.out.write('Hello World');", "System.out.flush('Hello World');"],
            answer: "System.out.println('Hello World');"
        },
        {
            question: "What is the purpose of the `main` method in Java?",
            options: ["To define a variable", "To declare a function", "To include a header file", "To start the program execution"],
            answer: "To start the program execution"
        },
        {
            question: "What is the syntax for declaring an array in Java?",
            options: ["int arr[5];", "int arr[] = {1, 2, 3, 4, 5};", "int arr[5] = {1, 2, 3, 4, 5};", "int arr[];"],
            answer: "int arr[5];"
        },
        {
            question: "What is the purpose of the `this` keyword in Java?",
            options: ["To refer to the current object", "To refer to the parent class", "To refer to the child class", "To refer to the interface"],
            answer: "To refer to the current object"
        },
        {
            question: "What is the syntax for declaring a class in Java?",
            options: ["public class MyClass { }", "private class MyClass { }", "protected class MyClass { }", "default class MyClass { }"],
            answer: "public class MyClass { }"
        },
        {
            question: "What is the purpose of the `extends` keyword in Java?",
            options: ["To inherit a class", "To implement an interface", "To override a method", "To overload a method"],
            answer: "To inherit a class"
        },
        {
            question: "What is the syntax for declaring an interface in Java?",
            options: ["public interface MyInterface { }", "private interface MyInterface { }", "protected interface MyInterface { }", "default interface MyInterface { }"],
            answer: "public interface MyInterface { }"
        },
        {
            question: "What is the purpose of the `implements` keyword in Java?",
            options: ["To inherit a class", "To implement an interface", "To override a method", "To overload a method"],
            answer: "To implement an interface"
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