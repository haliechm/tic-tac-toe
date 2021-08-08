// keeps track of whose turn it is
let player_x_turn = true;

// used to determine player within table cells array
let player_x = "X";
let player_o = "O";

// scoreboard variables
let player_x_score = 0;
let player_o_score = 0;
let num_of_draws = 0; 

// array of table cells 
let cells = [["avail", "avail", "avail"], 
             ["avail", "avail", "avail"], 
             ["avail", "avail", "avail"]];

// called each time cell is clicked
function addCell(cellNumber) {
    // making sure id is a num (note: adding 1 bc 0 is interpreted as falsey)
    if(parseInt(cellNumber) + 1) {
        addImage(cellNumber);
        changeTurns();
        checkWin(cellNumber);
        checkDraw();
    }
}

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


function checkWin() {

}

function checkDraw() {
    for(let i=0; i<cells.length; i++) {
        if(cells[i].includes("avail")) return;
    }
    document.getElementById("top-left").innerHTML="Draw!";
}

function changeTurns() {
    player_x_turn = !player_x_turn;
    curr_player = player_x_turn ? player_x : player_o;
    document.getElementById("top-left").innerHTML =  `${curr_player}'s turn`

}


