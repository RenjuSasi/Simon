var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var level = 0;
var started =false;

$(document).keydown(function() {
  if(!started){
  $("#level-title").text("Level 0");
  nextSequence();
  started =true;
}
});

$(".btn").click(function() {
  //alert("clicked: ");
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  audioPlay(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  /*$("#"+randomChosenColour).fadeTo(100, 0.3, function() { $(this).fadeTo(500, 1.0); });*/


  audioPlay(randomChosenColour);

}



function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){

if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
{
  console.log("Success");
  console.log(userClickedPattern);

} else {audioPlay("wrong"); $("body").addClass("game-over");
        setTimeout(function() {
        $("body").removeClass("game-over");
}, 200); $("#level-title").text("Game Over, Press Any Key to Restart");startOver(); }

if(currentLevel===gamePattern.length-1 && userClickedPattern[currentLevel]===gamePattern[currentLevel])
{
  console.log("sequence done");
    userClickedPattern = [];
  setTimeout(function() { nextSequence(); }, 1000);
}else console.log("sequence not done");

}

function audioPlay(audioToPlay){
  var audio = new Audio("sounds/" + audioToPlay + ".mp3");
  audio.play();
}

function startOver(){
  userClickedPattern = [];
   gamePattern = [];
   level = 0;
   started =false;
}
