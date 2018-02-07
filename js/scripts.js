function dSix(){
  return Math.floor(Math.random() * 6 + 1)
}

function isOdd(num){
  if (num % 2 === 0 && num > 0){
    return false
  } else {
    return true
  }
}

function autoPig() {
  console.log("AUTOPIG ACTIVATE.");
  //debugger;
  var behave = (Math.floor(Math.random() * 10 + 1))
  var rolls = 0
  playerTwo.roll();
  console.log("autoPig rolled: " + dieResult);
  rolls++;
  while ((behave + rolls > 0) && (isOdd(turn) === false)){
    if ((dieResult[0] === dieResult[1]) && (dieResult[0] != 1)){
      playerTwo.roll();
      console.log("autoPig rolled: " + dieResult);
      rolls++;

    }else if (behave+rolls < aggro(playerOne.totalScore, playerTwo.totalScore)){
      playerTwo.roll();
      console.log("autoPig rolled: " + dieResult);
      rolls++;
    } else {
      playerTwo.hold();
      console.log("autoPig held: " + playerTwo.totalScore);
      break;
    }
  }
  console.log("autoPig rolls: " + rolls);
}

function aggro(score1, score2){
  var scoreDiff = score1 - score2 ;
  var aggression = Math.floor(scoreDiff/10);

  if (aggression < 0){
    return 10;
  } else {
    return aggression;
  }
}

// player object stuff ---------
function Player(name) {
  this.name = name;
  this.totalScore = 0;
  this.turnScore = 0;
}

Player.prototype.roll = function() {
  var roll = [];
  roll.push(dSix());
  roll.push(dSix());
  dieResult = roll;
  if ((roll[0] === 1) && (roll[1] === 1)) {
    this.turnScore = 0;
    this.totalScore = 0;
    turn++;
    console.log(this.name + " turn score: " + this.turnScore);
    console.log("Turn: " + turn);
  } else if ((roll[0] === 1) || (roll[1] === 1)) {
    this.turnScore = 0;
    turn++;
    console.log("Turn: " + turn);
  } else {
    this.turnScore += (roll[0] + roll[1]);
    console.log(this.name + " turn score: " + this.turnScore);
  }
}

Player.prototype.hold = function() {
  this.totalScore += this.turnScore;
  this.turnScore = 0;
  turn++;
  console.log(this.name + " total score: " + this.totalScore);
  console.log(this.name + " turn score: " + this.turnScore);
  console.log("Turn: " + turn);
}

//Global Variables

var playerOne = new Player ("Player 1");
var playerTwo = new Player ("Player 2");
var players = [playerOne, playerTwo];

var turn = 1;
var dieResult = [];


//FRONT END BELOW THIS LINE ----------------

$(document).ready(function() {
  $("#playerOneName").text(playerOne.name);
  $("#playerOneTotalScore").text(playerOne.totalScore);
  $("#playerOneTurnScore").text(playerOne.turnScore);
  $("#playerTwoName").text(playerTwo.name);
  $("#playerTwoTotalScore").text(playerTwo.totalScore);
  $("#playerTwoTurnScore").text(playerTwo.turnScore);
  $("#turnArrow").text("<-------------");

  $("#roll").click(function() {
    $("#hold").prop("disabled", false);
    if (isOdd(turn)) {
      playerOne.roll()
      $("#playerOneTurnScore").text(playerOne.turnScore);
      $("#playerOneTotalScore").text(playerOne.totalScore);
      $("#dieOne").text(dieResult[0])
      $("#dieTwo").text(dieResult[1])
      if ((dieResult[0] === dieResult[1]) && (dieResult[0] != 1)) {
        $("#hold").prop("disabled", true);
      }
    } else {
      playerTwo.roll()
      $("#playerTwoTurnScore").text(playerTwo.turnScore);
      $("#playerTwoTotalScore").text(playerTwo.totalScore);
      $("#dieOne").text(dieResult[0])
      $("#dieTwo").text(dieResult[1])
      if ((dieResult[0] === dieResult[1]) && (dieResult[0] != 1)) {
        $("#hold").prop("disabled", true);
      }
    }

    if (isOdd(turn)){
      $("#turnArrow").text("<-------------");
    } else {
      $("#turnArrow").text("------------->");
    }
    if ((isOdd(turn) === false) && ($("input:radio[name=playersNumber]:checked").val() === "1")) {
      console.log("AUTOPIG ENGAGED");
      autoPig();
      $("#playerTwoTotalScore").text(playerTwo.totalScore);
      $("#playerTwoTurnScore").text(playerTwo.turnScore);
      $("#turnArrow").text("<-------------");

      if (playerTwo.totalScore >= 100){
        alert("autoPig IS VICTORIOUS.");
        $("form#form").show();
        $(".game").hide();
        reset(players);
      }
    }
  })

  $("#hold").click(function() {
  //  debugger;
    if (isOdd(turn)) {
      playerOne.hold();
      $("#playerOneTotalScore").text(playerOne.totalScore);
      $("#playerOneTurnScore").text(playerOne.turnScore);

      if (playerOne.totalScore >= 100){
        alert("Player One Wins!");
        $("form#form").show();
        $(".game").hide();
        reset(players);
      }
    } else {
      playerTwo.hold();
      $("#playerTwoTotalScore").text(playerTwo.totalScore);
      $("#playerTwoTurnScore").text(playerTwo.turnScore);

      if (playerTwo.totalScore >= 100){
        alert("Player Two Wins!");
        $("form#form").show();
        $(".game").hide();
        reset(players);
      }
    }

    if (isOdd(turn)){
      $("#turnArrow").text("<-------------");
    } else {
      $("#turnArrow").text("------------->");
    }
    if ((isOdd(turn) === false) && ($("input:radio[name=playersNumber]:checked").val() === "1")) {
      console.log("AUTOPIG ENGAGED");
      autoPig();
      $("#playerTwoTotalScore").text(playerTwo.totalScore);
      $("#playerTwoTurnScore").text(playerTwo.turnScore);
      $("#turnArrow").text("<-------------");

      if (playerTwo.totalScore >= 100){
        alert("autoPig IS VICTORIOUS.");
        $("form#form").show();
        $(".game").hide();
        reset(players);
      }
    }
  })//Hold Function END


  function reset(players){
    for (var i=0;i<players.length;i++) {
      console.log(players.length);
      var player = players[i];
      player.turnScore = 0;
      player.totalScore = 0;
      turn = 1;
    }
    $("#playerOneName").text(playerOne.name);
    $("#playerOneTotalScore").text(playerOne.totalScore);
    $("#playerOneTurnScore").text(playerOne.turnScore);
    $("#playerTwoName").text(playerTwo.name);
    $("#playerTwoTotalScore").text(playerTwo.totalScore);
    $("#playerTwoTurnScore").text(playerTwo.turnScore);
    $("#turnArrow").text("<-------------");
  }

    $("input:radio[name=playersNumber]").change(function() {
      $("#hideme").toggle();
    })

    $("form#form").submit(function(event) {
      event.preventDefault();
      playerOne.name = $("#inputPlayerOneName").val();
      playerTwo.name = $("#inputPlayerTwoName").val();
      $("#playerOneName").text(playerOne.name);
      $("#playerTwoName").text(playerTwo.name);
      $("form#form").hide();
      $(".game").show();
    })


});
