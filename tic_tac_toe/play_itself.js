/*
                            GAME VARIABLES
 _________________________________________________________________________ 
 
*/

// keeps track of whose turn it is
let player_x_turn = true;

// used to determine player within table cells array
let player_x = "X";
let player_o = "O";

// scoreboard variables
let player_x_score = 0;
let player_o_score = 0;
let num_of_draws = 0; 

// keeps track of if round is over
let round_over = false;

// array of table cells (used to determine wins/draws)
let cells = [["avail", "avail", "avail"], 
             ["avail", "avail", "avail"], 
             ["avail", "avail", "avail"]];

let auto_tds = ["00", "01", "02", 
                "10", "11", "12", 
                "20", "21", "22"];


/*
                            FUNCTIONS
 _________________________________________________________________________ 
 
*/

function startGame() {
    // blur entire screen
    document.getElementById("will-blur").classList.add("blurred");
    // get box to pop up to indicate if next round should start
    document.getElementById("popup-box2").classList.remove("d-none");
}

function startGameYes() {
    // unblur entire screen
    document.getElementById("will-blur").classList.remove("blurred");

    // remove pop-up box
    document.getElementById("popup-box2").classList.add("d-none");

    // play itself
    continuePlay();
}

// used only for plays_itself version 
function continuePlay() {
    if(!round_over) {
        let rand_index = getRandomInt(9);
        if(auto_tds[rand_index] !== "not_avail") {
            setTimeout(function() {addCellRand(rand_index);}, 1500); 
        } else {
            continuePlay();
        }
    }
}

function addCellRand(rand_index) {
    addCell(auto_tds[rand_index]);
    auto_tds[rand_index] = "not_avail";
    continuePlay();
}

// called each time a cell is clicked
function addCell(cellNumber) {
    // making sure id is a num (note: adding 1 bc 0 is interpreted as falsey) and round is not over
    if(parseInt(cellNumber) + 1 && !round_over) {
        // play sound of drawing 
        if(getCurrentPlayer() === "O") {
            document.getElementById("sound-O").play();
        } else {
            document.getElementById("sound-X").play();
        }

        addImage(cellNumber);
        checkWin(cellNumber);
        if(!round_over) checkDraw();    // only do this if round is not over (edge case: win but all cells filled up)
        if(!round_over) changeTurns(); 
    }
}

// changes table cells to portray game correctly
function addImage(cellNumber) {
    // add image to cell
    var cell = document.getElementById(cellNumber);
    var image = cell.querySelector("img");
    image.src = player_x_turn ? "/image/x.png" : "/image/o.png";

    // change cells array to player's char
    cells[parseInt(cellNumber[0])][parseInt(cellNumber[1])] = player_x_turn ? player_x : player_o;

    // change id of cell to player's char
    cell.id = player_x_turn ? player_x : player_o;
}

// switches whose turn it is
function changeTurns() {
    player_x_turn = !player_x_turn;
    let curr_player = getCurrentPlayer();
    document.getElementById("top-left").innerHTML =  `${curr_player}'s turn`
}

// determines if a tie has occurred
function checkDraw() {
    for(let i=0; i<cells.length; i++) {
        console.log("im in here! no draw yet");
        if(cells[i].includes("avail")) return;
    }
    console.log("im hereeeeeee there's a draw");
    num_of_draws++;
    round_over=true;
    document.getElementById("top-left").innerHTML="Draw!";
    document.getElementById("score-draws").innerHTML=`Draws: ${num_of_draws}`;

}

// determines if a win has occurred
function checkWin(cellNumber) {
    if(verticalCheck(cellNumber) || horizontalCheck(cellNumber) || diagonalCheck()) {
        round_over = true;
        let current_player = getCurrentPlayer();

        var current_player_score= player_x_turn ? player_x_score++ : player_o_score++;
        current_player_score++;

        document.getElementById("top-left").innerHTML=`${current_player} wins!`;
        document.getElementById(`score-${current_player}`).innerHTML=`${current_player}'s score: ${current_player_score}`;
    }
}

// checks to see if there is a row win
function horizontalCheck(cellNumber) {
    var col_num = parseInt(cellNumber[0]);
    var curr_player = getCurrentPlayer();  
    console.log(curr_player);
    for(let i=0; i<cells.length; i++) {
        if(curr_player !== cells[col_num][i]) return false;
    }
    return true;
}

// checks to see if there is a column win
function verticalCheck(cellNumber) {
    var row_num = parseInt(cellNumber[1]);
    var curr_player = getCurrentPlayer(); 
    for(let i=0; i<cells.length; i++) {
        if(curr_player !== cells[i][row_num]) return false;
    }
    return true;
}

// checks two diagonals to see if win has occurred (hardcoded)
function diagonalCheck() {
    var curr_player = getCurrentPlayer(); 
    return((cells[0][0] === curr_player && cells[1][1] === curr_player && cells[2][2] === curr_player)
    || (cells[0][2] === curr_player && cells[1][1] === curr_player && cells[2][0] === curr_player)
    );
}


// allows for next round to occur
function nextRound() {
    // blur entire screen
    document.getElementById("will-blur").classList.add("blurred");
    // get box to pop up to indicate if next round should start
    document.getElementById("popup-box").classList.remove("d-none");
}

// user hits 'yes' for going to next round
function nextRoundYes() {
    // reset all image paths of srcs
    let game_board = document.getElementsByClassName('game-table');
    let all_images = game_board[0].getElementsByTagName('img');
    [...all_images].forEach(image => image.src="");

    // reset double array cells
    //cells.forEach(arr => arr.forEach(cell => cell="avail"));
    cells = [["avail", "avail", "avail"], 
             ["avail", "avail", "avail"], 
             ["avail", "avail", "avail"]];

    auto_tds = ["00", "01", "02", 
                "10", "11", "12", 
                "20", "21", "22"];

    // reset all cell ids
    let all_tds = document.getElementsByTagName('td');
    var curr = 0;
    for(let i=0; i<cells.length; i++) {
        for(let j=0; j<cells.length; j++) {
            all_tds[curr].id = `${i}${j}`;
            curr++;
        }
    }

    // reset variables
    round_over=false;
    document.getElementById("top-left").innerHTML =  `${getCurrentPlayer()}'s turn`
    
    // unblur entire screen
    document.getElementById("will-blur").classList.remove("blurred");

    // remove pop-up box
    document.getElementById("popup-box").classList.add("d-none");

    // continue playing itself
    continuePlay();
}

// user hits 'no' for going to next round
function nextRoundNo() {
    // unblur entire screen
    document.getElementById("will-blur").classList.remove("blurred");

    // remove pop-up box
    document.getElementById("popup-box").classList.add("d-none");
}

function getCurrentPlayer() {
    return player_x_turn ? player_x : player_o;
}

function getRandomInt(max) {
  // exclusive max
  return Math.floor(Math.random() * max);
}

startGame();

