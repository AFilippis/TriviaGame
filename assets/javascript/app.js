$(document).ready(function () {
    /*Global Variables
    ==============================================================*/
    //Counter
    var trivTime = 0;
    var rightCount = 0;
    var wrongCount = 0;
    var qACount = 1;
    //======================
    var timer = '';
    var qA = {
        1: {
            question: 'On the popular social website Reddit, what does AMA stand for?',
            answers: ['all my answers', 'ask me all', 'ask me anything', 'all meals allowed'],
            correct: 'ask me anything',
            right: 'Correct!',
            wrong: 'Wrong!',

        },
        2: {
            question: 'What was the first console video game that allowed the game to be saved?',
            answers: ['the legend of zelda', 'tomb raider', 'spyro', 'mario'],
            correct: 'the legend of zelda',
            right: 'Correct!',
            wrong: 'Wrong!',

        },
        3: {
            question: 'In what year was the first Apple computer released?',
            answers: ['1974', '1982', '1980', '1976'],
            correct: '1976',
            right: 'Correct!',
            wrong: 'Wrong!',

        },
        4: {
            question: 'Created in 2009, what was the first decentralized cryptocurrency?',
            answers: ['litecoin', 'bitcoin', 'ethereum', 'ripple'],
            correct: 'bitcoin',
            right: 'Correct!',
            wrong: 'Wrong!',

        },
        5: {
            question: 'The companies HP, Microsoft and Apple were all started in a what?',
            answers: ['office', 'kitchen', 'garage', 'car'],
            correct: 'garage',
            right: 'Correct!',
            wrong: 'Wrong!',

        }

    };
    /*Functions
    ==============================================================*/
    var start = function () {
        //when buttons are clicked clear trivSection
        $('.startBtn').on('click', function () {
            //emptys trivSection
            $('.trivSection').empty();
            createQuestions();
        });
    }
    var createQuestions = function () {
        timerStart();
        //get question
        var question = qA[qACount]['question'];
        //assign div element to newDiv
        var newDiv = $('<div>');
        //add a class to newDIv
        newDiv.addClass('question');
        //add text to question
        newDiv.text(question);
        //add question to DOM
        $('.trivSection').append(newDiv);
        createAnswers();
    }
    var createAnswers = function () {
        var answerLength = qA[qACount]['answers'].length;
        for (var i = 0; i < answerLength; i++) {
            //get answers
            var answers = qA[qACount]['answers'][i];
            //create new div to hold answers
            var newBtn = $('<button>');
            //add class to new Div
            newBtn.addClass('answers blueBtn');
            //give buttons attribute
            newBtn.attr('data-type', answers);
            //add text to new Div
            newBtn.text(answers);
            //add answers to DOM
            $('.trivSection').append(newBtn);
        }
        //prevents click event from being saved
        $(document).off('click', '.answers', checkAnswer);
        $(document).on('click', '.answers', checkAnswer);
    }
    var checkAnswer = function () {
        //get users answer choice
        var userAnswer = $(this).data('type');
        var correctAnswer = qA[qACount]['correct'];

        var right = qA[qACount]['right'];
        var wrong = qA[qACount]['wrong'];
        console.log(qACount);
        if (userAnswer === correctAnswer) {
            //update rightCount
            rightCount++;
            //clears out triv Section
            $('.trivSection').empty();
            //create Div
            var newDiv = $('<div>');
            //give div class
            newDiv.addClass('rightAnswer');
            //adds CORRECT! text to div
            newDiv.text(right);
            //add answer to DOM
            $('.trivSection').append(newDiv);
            //stops time
            clearInterval(timer)
            //increment Q count
            qACount++;
            if (qACount <= 3) {
                //removes CORRECT! text and continues to create next question after 3 seconds
                setTimeout(
                    function () {
                        $('.trivSection').empty();
                        createQuestions();
                    }, 3500);
            }
            else {
                $('.trivSection').empty();
                //create Div
                var newDiv = $('<div>');
                //give div class
                newDiv.addClass('rightAnswer');
                //adds CORRECT! text to div
                newDiv.text(right);
                //add answer to DOM
                $('.trivSection').append(newDiv);
                //stops time
                clearInterval(timer)
                //reset
                setTimeout(gameOver, 3500);
            }
        }
        else {
            wrongCount++;
            //clears out trivSection
            $('.trivSection').empty();
            var newDiv = $('<div>');
            //give div class
            newDiv.addClass('wrongAnswer');
            //adds Wrong! text to div
            newDiv.text(wrong);
            //add answer to DOM
            $('.trivSection').append(newDiv);
            //stops time
            clearInterval(timer)
            //increment Q count
            qACount++;

            if (qACount <= 3) {
                setTimeout(function () {
                    $('.trivSection').empty();
                    createQuestions();
                }, 3500);
            }
            else {
                //clears out trivSection
                $('.trivSection').empty();
                var newDiv = $('<div>');
                //give div class
                newDiv.addClass('wrongAnswer');
                //adds Wrong! text to div
                newDiv.text(wrong);
                //add answer to DOM
                $('.trivSection').append(newDiv);
                //stops time
                clearInterval(timer);
                //reset
                setTimeout(gameOver, 3500);
            }
        }
    }
    //Timer
    //==========================================
    var timerStart = function () {
        $('.timerSection').empty();
        //sets time to 10
        trivTime = 100;
        //progress bar?? 
        var timeTag = $('<div>');
        timeTag.addClass('time');
        timeTag.addClass('progress');
        var progressBar = $('<div>');
        progressBar.addClass('progress-bar');
        progressBar.width(trivTime + '%');

        $('.timerSection').append(timeTag);
        $('.time').append(progressBar);
        //decrements time
        timer = setInterval(timeDecrement, 100);
    }
    var timeDecrement = function () {
        //nifty progress bar decrement
        $('.progress-bar').width(trivTime + '%');
        trivTime--;
        //if time gets to 0
        if (trivTime === -30) {
            userAnswer = false;
            //clears Time
            clearInterval(timer);
            checkAnswer();
        }

    }
    var gameOver = function () {
        //wipe trivia
        $('.trivSection').empty();
        //wipe timer
        $('.timerSection').empty();
        var scoreDiv = $('<div>');
        scoreDiv.addClass('score');
        scoreDiv.html('Correct: ' + rightCount + '<br>' + 'Wrong: ' + wrongCount);
        $('.trivSection').append(scoreDiv);
        //assign new div element to new Div
        var newDiv = $('<div>');
        //add class to new Div
        newDiv.addClass('gameOver');
        //add game over text
        newDiv.text('Game Over! Play Again ?');
        //game over text add
        $('.trivSection').append(newDiv);
        //Create ResetButton
        var newBtn = $('<button>');
        //Give btn Class
        newBtn.addClass('blueBtn resetBtn');
        //Give btn reset Text
        newBtn.text('Reset');
        //Append
        $('.trivSection').append(newBtn);
        //wipe values
        trivTime = 100;
        qACount = 1;
        rightCount = 0;
        wrongCount = 0;
        //reset all
        $('.resetBtn').on('click', function () {
            $('.trivSection').empty()
            //Starts game over
            createQuestions();
        });
    }

    start();
});