'use strict'
const WALL = '🧱'
const FOOD = '•'
const EMPTY = ' ';
const SUPER_FOOD = '🍪'
var gFoodSpread = 0;

var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    gBoard = buildBoard();
    createPacman(gBoard);
    createGhosts(gBoard);
    createCherries(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    checkFood();
}

function restartGame() {
    gGame = {
        score: 0,
        isOn: false
    }
    gFoodSpread = 0;
    updateScore(0);
    toggleModal('hidden');
    init();
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            // gFoodSpread++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                // gFoodSpread--;
            }
            if ((i===1 && (j === 1 || j === SIZE-2) || (i===SIZE-2) && (j===1 || j=== SIZE-2))){
                board[i][j] = SUPER_FOOD
            }
        }
    }
    return board;
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver() {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherries)
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    // check win or lose to display correct message
    var message = (gFoodSpread === 0) ? 'Victory!' : 'Game Over';
    toggleModal('visible', message);
}

//visible if visible or hidden; mode=game over or victory
function toggleModal(visible, message) {
    var elModal = document.querySelector('.modal')
    var elMessage = document.querySelector('.message')
    elMessage.innerText = message;
    elModal.style.visibility = visible;
}

function checkWin(){
    checkFood();
    if (gFoodSpread === 0) {
        gameOver();
    }
}

function checkFood(){
    gFoodSpread=0;
    for (var i=0 ; i< gBoard.length; i++){
        for (var j=0; j<gBoard[0].length; j++){
            if(gBoard[i][j] === FOOD || gBoard[i][j] === SUPER_FOOD){
                gFoodSpread++;
            }

        }
    }
    for (var i=0; i< gGhosts.length; i++){
        if(gGhosts[i].currCellContent === FOOD || gGhosts[i].currCellContent === SUPER_FOOD){
            gFoodSpread++;
        }
    }
    return gFoodSpread;
}