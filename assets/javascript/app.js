$(document).ready(function () {

    var Questions = [{
        //Question 1:
        question: "What is the world's longest river?",
        answerList: ["Amazon", "Nile", "Yangtze", "Mississippi"],
        answer: 1,
        image: "./assets/images/nile.jpg"
    }, {
        //Question 2:
        question: "When did the Cold War end?",
        answerList: ["1988", "1989", "1990", "1991"],
        answer: 1,
        image: "./assets/images/coldwar.jpg"
    }, {
        //Question 3:
        question: "What colour is Absynthe?",
        answerList: ["Red", "While", "Blue", "Green"],
        answer: 3,
        image: "./assets/images/green.jpg"
    }, {
        //Question 4:
        question: "What is the diameter of Earth?",
        answerList: ["9872", "11892", "12742", "13651"],
        answer: 2,
        image: "./assets/images/12742.jpg"
    }, {
        //Question 5:
        question: "What is the highest mountains on Earth?",
        answerList: ["Mount Everest", "Godwin Austen", "Kangchenjunga", "Lhotse"],
        answer: 0,
        image: "./assets/images/ME.gif"
    }, {
        //Question 6: 
        question: "What is the capital city of Spain?",
        answerList: ["Barcelona", "Alencia", "Madrid", "Seville"],
        answer: 2,
        image: "./assets/images/madrid.gif"
    }, {
        //Question 7: 
        question: "How many ethnic groups live in China?",
        answerList: ["48", "56", "62", "70"],
        answer: 1,
        image: "./assets/images/56.gif"
    }, {
        //Question 8: 
        question: "Australia is home to the largest structure built by living organisms on the planet. What is it?",
        answerList: ["The Great Barrier Reef", "A wombat burrow", "Ayers Rock", "A termite tower in the outback"],
        answer: 0,
        image: "./assets/images/au.gif"
    } ]

    
    var correctChoices = 0;
    var wrongChoices = 0;

    var currentQuestion = 0;

    var unanswered = 0;
    var answered = 0;
    var userSelect = 0;

    var sec = 0;
    var time = 0;

    var messages = {
        correct: "Correct!",
        incorrect: "Nope!",
        endTime: "Out Of Time!",
        finished: "All done, here's how you did!",
    }

    function startGame() {
        $('#finalMessage').empty();
        $('#correctAnswers').empty();
        $('#wrongAnswers').empty();
        $('#unanswered').empty();
    
        currentQuestion = 0;
        correctChoices = 0;
        wrongChoices = 0;
        unanswered = 0;
       
        newQuestion()
    }

    
    function countDown() {
        sec = 15;
        $('#timer').html('<h3> Time Remaining: ' + sec + ' Seconds </h3>');
        answered = true;
        time = setInterval(showCountdDown, 1000);
    }

    function showCountdDown() {
        sec--;
        $('#timer').html('<h3> Time Remaining: ' + sec + ' Seconds </h3>');
        if (sec < 1) {
            clearInterval(time);
            answered = false;
            answerPage()
        }
    }


    function newQuestion() {
        $('#message').empty();
        $('#correctedAnswer').empty();
        answered = true;
        $("img").hide();
        
        $('.question').html('<h2>' + Questions[currentQuestion].question + '</h2>');
        for (var i = 0; i < 4; i++) {
            var choices = $('<div>');
            choices.text(Questions[currentQuestion].answerList[i]);
            choices.attr({ 'data-index': i });
            choices.addClass('thisChoice');
            $('.answerList').append(choices);
        }

        countDown();


        $('.thisChoice').on('click', function () {
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage()
        });
    }

    
    function answerPage() {
        $('#currentQuestion').empty();
        $('.thisChoice').empty();
        $('.question').empty();

        var rightAnswerText = Questions[currentQuestion].answerList[Questions[currentQuestion].answer];
        var rightAnswerIndex = Questions[currentQuestion].answer;
        var img = $('<img>');
            $("img").hide();
            img.attr("src", Questions[currentQuestion].image);

        if ((userSelect == rightAnswerIndex) && (answered == true)) {
            correctChoices++;
            $('#message').html(messages.correct);
            img.appendTo("#image");
            
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            wrongChoices++;
            $('#message').html(messages.incorrect);
            $('#correctedAnswer').html('The correct Answer was: ' + rightAnswerText);
            img.appendTo("#image");
        } else {
            unanswered++;
            $('#message').html(messages.endTime);
            $('#correctedAnswer').html('The correct Answer was: ' + rightAnswerText);
            img.appendTo("#image");
            answered = true;
        }
        
        if (currentQuestion == (Questions.length - 1)) {
            setTimeout(scoreBoard, 4000)
        } else {
            currentQuestion++;
            setTimeout(newQuestion, 4000);
        }
    }

    function scoreBoard() { 
        $('#message').empty();
        $('#correctedAnswer').empty();
        $("img").hide();


        $('#finalMessage').html(messages.finished);

        $('#correctAnswers').html("Correct Answers: " + correctChoices);
        $('#wrongAnswers').html("Wrong Answers: " + wrongChoices);
        $('#unanswered').html("Unanswered: " + unanswered);
         
        $('#startAgainBtn').addClass('reset');
        $('#startAgainBtn').show();
        $('#startAgainBtn').html('Start Over?');
    }


    $('#startBtn').on('click', function () {
        $(this).hide();
        startGame();
    });

    $('#startAgainBtn').on('click', function () {
        $(this).hide();
        startGame();
    });

});
