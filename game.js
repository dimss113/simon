var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var btnPress = 0;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    return randomNumber;
}

function resetUser(){
    btnPress = 0;
    userClickedPattern = [];
}

$("body").on("keypress", function (event) {
    if(event.key === 'a' || event.key === 'A'){
        $("#level-title").text("Level " + level);
        resetUser();
        nextSequence();
        var buttonColors = ["red", "blue", "green", "yellow"];
        var randomChosenColor = buttonColors[nextSequence()];
        gamePattern.push(""+randomChosenColor);
    
        for(let i=0; i<gamePattern.length;i++){
            setTimeout(function(){
                $("#" + gamePattern[i]).fadeOut(50).fadeIn(50);
                playSound(gamePattern[i]);
            }, 500 * i);
        }
        level++;
    }else{
        $("#level-title").text("Press A Key to Start");
    }

});


$(".btn").on("click", function (event) {
    var userChosenColor = $(this).attr("id");
    animatePress(""+userChosenColor);
    playSound(userChosenColor+"");
    userClickedPattern.push("" + userChosenColor);
    if(btnPress === level-1){
        console.log("masuk checkerrrrrr");
        console.log(level-1);
        console.log(btnPress);
        checkAnswer(level-1);
    }
    btnPress++;

});

function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}


function animatePress(boxId){
    $("#" + boxId).addClass("pressed");
    setTimeout(() => {
        $("#" + boxId).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] !== userClickedPattern[btnPress]){
        console.log("you are lose");
        gameOver();
    }else{
        console.log("press a to the next level");
    }
}

function gameOver(){
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
}

function startOver(){
    gamePattern = [];
    level = 0;
}