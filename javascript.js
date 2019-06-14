var col1Count = 0;
var col2Count = 0;
var col3Count = 0;
var col4Count = 0;
var col5Count = 0;
var col6Count = 0;
var col7Count = 0;
var col1 = "col1";
var col2 = "col2";
var col3 = "col3";
var col4 = "col4";
var col5 = "col5";
var col6 = "col6";
var col7 = "col7";
var winning = false;
var winningRowArray = [];
var winningColArray = [];
var winningDiagArray = [];
var winningDiagArray2 = [];

var colorChange = [];
var colorArray = [];

var p1Name = "Player 1";
var p2Name = "Player 2";


var oWins = 0;
var pWins = 0;
var popSound = document.getElementById("pop");
var bannedp1 = "purple";
var bannedp2 = "orange";
var team1Color = "orange";
var team2Color = "purple";
var team = team1Color;
popSound.volume = 1;



//Changes The Player's Color
function changeColor(color, num) {
    if (num == 1 && color != bannedp1) {
        team1Color = color;
        document.getElementById("p1color").style.backgroundColor = color;
        bannedp2 = color;
    } else if (num == 2 && color != bannedp2) {
        team2Color = color;
        document.getElementById("p2color").style.backgroundColor = color;
        bannedp1 = color;
    }
    team = team1Color;
}

//Activated on Start Button, Begins the Game with Pre-Setup
function begin() {
    p1Name = document.getElementById("p1name").value;
    p2Name = document.getElementById("p2name").value;
    if (p1Name == "") {
        p1Name = "Player 1";
    }
    if (p2Name == "") {
        p2Name = "Player 2";
    }
    startBoard();
}


//Spawn The Connect 4 Board
function startBoard() {

    //Cancel Color Changing Pieces Animation
    if (colorChange.length > 1) {
        for (i = 0; i < clearInterval.length; i++) {
            clearInterval(colorChange[i]);
        }
        colorChange.length = 0;
    }

    winning = false;
    col1Count = col2Count = col3Count = col4Count = col5Count = col6Count = col7Count = 0;

    document.getElementById("gamearea").innerHTML = "<h2 style='float:left;' id='p1title'>" + p1Name + "</h2><h2 style='float:right;' id='p2title'>" + p2Name + "</h2><img id='gameboard' src='pics/board.png'><div id='columnarea'><div id='ccol1' class='columns' onclick='col1Count++;spawnPiece(col1, col1Count);' style='margin-left:13px;'></div><div id='ccol2' class='columns' onclick='col2Count++;spawnPiece(col2, col2Count);'></div><div id='ccol3' class='columns' onclick='col3Count++;spawnPiece(col3, col3Count);'></div><div id='ccol4' class='columns' onclick='col4Count++;spawnPiece(col4, col4Count);'></div><div id='ccol5' class='columns' onclick='col5Count++;spawnPiece(col5, col5Count);'></div><div id='ccol6' class='columns' onclick='col6Count++;spawnPiece(col6, col6Count);'></div><div id='ccol7' class='columns' onclick='col7Count++;spawnPiece(col7, col7Count);'></div></div>"
    if (team == team1Color) {
        document.getElementById("p1title").style.textShadow = "0px 0px 10px " + team1Color + ",0px 0px 10px " + team1Color + ",0px 0px 10px " + team1Color;
        console.log("team 1 turn")
    } else {
        document.getElementById("p2title").style.textShadow = "0px 0px 10px " + team2Color + ",0px 0px 10px " + team2Color + ",0px 0px 10px " + team2Color;
    }
}



//Function To Spawn The Piece and Pass Info For The Checking
function spawnPiece(col, count) {
    count--
    if (count < 6) {
        var row = count + 1

        document.getElementById("gamearea").innerHTML += "<div class='circlet " + team + " " + col + " row" + row + "' style='top:" + (78) + "px;background-color:" + team + "' id='" + row + col + "'>";

        popSound.play();
        var animnum = 0;
        runAgain();

        function runAgain() {
            var elmnt = document.getElementById(row + col);
            if (animnum < 95 * (Math.abs(count - 5))) {
                elmnt.style.top = (parseInt(elmnt.style.top.slice(0, -2)) + 7) + "px";
                animnum += 7;
                window.setTimeout(runAgain, 1);
            } else if (animnum > 95) {
                elmnt.style.top = (552 - (95 * count)) + "px";
                animnum
            }
        }
        var colAnswer = checkCol(row, col.slice(3, 4), "col");
        var rowAnswer = checkRow(row, col.slice(3, 4), "col");
        var diagAnswer1 = checkDiag("row" + row, col, "left");
        var diagAnswer2 = checkDiag2("row" + row, col, "right");



        //Win Detection
        if (rowAnswer == true || colAnswer == true || diagAnswer2 == true || diagAnswer1 == true) {
            if (team == team1Color) {
                oWins++
            } else {
                pWins++
            }
            console.log(winningRowArray);
            if (winningRowArray.length >= 4) {
                console.log(winningRowArray);
                winningTileColor(winningRowArray);
            }
            if (winningColArray.length >= 4) {
                console.log(winningColArray)
                winningTileColor(winningColArray);
            } else if (winningDiagArray.length == 4) {
                winningTileColor(winningDiagArray);
            } else if (winningDiagArray2.length == 4) {
                winningTileColor(winningDiagArray2);
            }
            col1Count = col2Count = col3Count = col4Count = col5Count = col6Count = col7Count = 7;
            winning = true;

            //Summon New Menu
            window.setTimeout(function () {
                var winTeamString;
                var winTeamColor;

                if (team == team1Color) {
                    winTeamString = p2Name
                    winTeamColor = team2Color
                } else {
                    winTeamString = p1Name
                    winTeamColor = team1Color
                }
                document.getElementById("gamearea").innerHTML += "<div id='winscreen'><h1 id='winname' style='color:" + winTeamColor + "'>" + winTeamString + " Wins!</h1><h1 style='text-align:center;'>Totals</h1><div style='float:left;width:50%'><h2 style='text-align:center;'>" + p1Name + " Total Wins</h2><h2 style='text-align:center;'>" + oWins + "</h2></div><div style='float:right;width:50%;'><h2 style='text-align:center;'>" + p2Name + " Total Wins</h2><h2 style='text-align:center;'>" + pWins + "</h2></div><div id='buttondiv'><h2 class='bigbutton' onclick='startBoard();'>Rematch</h2><h2 class='bigbutton' onclick='quitGame();'>Quit Game</h2></div></div>"
                //startBoard();
            }, 1000)
        }



        //Team Shadow and Color Updater
        if (team == team1Color) {
            team = team2Color;
            document.getElementById("p2title").style.textShadow = "0px 0px 10px " + team2Color + ", 0px 0px 10px " + team2Color + ", 0px 0px 10px " + team2Color + ", 0px 0px 10px " + team2Color;
            document.getElementById("p1title").style.textShadow = "0px 0px 5px rgba(0,0,0,0)";
        } else {
            team = team1Color;
            document.getElementById("p1title").style.textShadow = "0px 0px 10px " + team1Color + ", 0px 0px 10px " + team1Color + ", 0px 0px 10px " + team1Color + ", 0px 0px 10px " + team1Color;
            document.getElementById("p2title").style.textShadow = "0px 0px 5px rgba(0,0,0,0)";
        }
        //Tie Page
    } else if (col1Count >= 6 && col2Count >= 6 && col3Count >= 6 && col4Count >= 6 && col5Count >= 6 && col6Count >= 6 && col7Count >= 6 && winning == false) {

        //Summon New Menu
        window.setTimeout(function () {
            var winTeamString;
            var winTeamColor;

            if (team == team1Color) {
                winTeamString = p2Name
                winTeamColor = team2Color
            } else {
                winTeamString = p1Name
                winTeamColor = team1Color
            }
            document.getElementById("gamearea").innerHTML += "<div id='winscreen'><h1 id='winname' style='color:black'>Tie!</h1><h1 style='text-align:center;'>Totals</h1><div style='float:left;width:50%'><h2 style='text-align:center;'>" + p1Name + " Total Wins</h2><h2 style='text-align:center;'>" + oWins + "</h2></div><div style='float:right;width:50%;'><h2 style='text-align:center;'>" + p2Name + " Total Wins</h2><h2 style='text-align:center;'>" + pWins + "</h2></div><div id='buttondiv'><h2 class='bigbutton' onclick='clearInterval(colorChange);startBoard();'>Rematch</h2><h2 class='bigbutton' onclick='quitGame();'>Quit Game</h2></div></div>"
            //startBoard();
        }, 300)
    }
}



//Reloads Page
function quitGame() {
    location.reload();
}




//Changes The Tile Colors Of The Winning Tiles To White
function winningTileColor(ar) {
    colorArray = ar;
    for (i = 0; i < ar.length; i++) {
        document.getElementById(ar[i].slice(0, 1) + "col" + ar[i].slice(1, 2)).style.backgroundColor = "white";

        //colorChange[i] = window.setInterval(function () {
            //console.log("change")
           // window.setTimeout(function () {
               // colorArray[0].slice(1, 2).style.backgroundColor = "black";
               // console.log("change back")
            //}, 500)
       // }, 1000)
        console.log("HOORAY")
    }
}
