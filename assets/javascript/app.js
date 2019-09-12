let counter = 10;
let currentQuestion = 0;
let score =0; 
let lost =0;
let timer;
        // if timer is over go to next question
    function nextQuestion() {
        const isQuestionOver = (triviaQuestions.length - 1) === currentQuestion;
        if (isQuestionOver) {
            displayResult();
        }else{
            currentQuestion++;
            loadQuestion();
        }

    }
    
function timeUp() {
    clearInterval(timer);
    
        lost++;

        nextQuestion();
}

    function countDown() {
        counter--;

        $('#time').html('timer: ' + counter);
        if (counter ===0) {
            timeUp();
           
        }
    }

function loadQuestion() {
    counter = 10;
    timer = setInterval(countDown, 1000);


    const question = triviaQuestions[currentQuestion].question; //
    const choices = triviaQuestions[currentQuestion].choices; //

        $('#time').html('timer: ' + counter);
        $('#game').html(`<h4>${question}<h4> ${loadChoices(choices)}
        `);
            
    }

function loadChoices(choices) {
    let result = '';

    for(let i= 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }

        return result;

}
    // when right/wrong choice is picked go to next question
$(document).on('click', '.choice', function() {
   clearInterval(timer);
     const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = triviaQuestions[currentQuestion].correctAnswer;
    
    if (correctAnswer === selectedAnswer) {
        score++;
        nextQuestion();
    }else{
        lost++;
        nextQuestion();
    }
});

function displayResult() {
    const result =`
    <p>your Score ${score}</p>
    <p>you Missed ${lost}</p>
    <p>Total Questions ${triviaQuestions.length}</p>
    <button class="btn btn-primary" id="reset">Reset Game</button>
    `;
    
    $('#game').html(result);
}

$(document).on('click', '#reset', function(){
    counter = 10;
    currentQuestion = 0;
    score =0; 
    lost =0;
    timer = null;
    loadQuestion();
});


$('#start').click(function() {
    $('#start').remove();
    $('#timer').html(counter);
    loadQuestion();
});
