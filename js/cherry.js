'use strict'
const CHERRY = '🍒';
var gCherries = [];
var gIntervalCherries;

// createCherries(gBoard);

function createCherry(board) {
    var emptySlots = findEmptySlots(board);
    if(emptySlots.length === 0) return;
	var randIdx = getRandomIntInclusive(0, emptySlots.length-1);
    
    var cherryI = emptySlots[randIdx].i ;
    var cherryJ = emptySlots[randIdx].j ;
    
    var cherry = {
        location: {
            i: cherryI,
            j: cherryJ
        }
    }
    gCherries.push(cherry);
    board[cherry.location.i][cherry.location.j] = CHERRY;
    renderCell(cherry.location,CHERRY);
    return board;
}

function findEmptySlots(board) {
	var emptySlots = [];
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			if (board[i][j] === EMPTY) {
				emptySlots.push({ i: i, j: j })
			}
		}
	}
	return emptySlots;
}


function createCherries(board) {
    gIntervalCherries = setInterval(() => {createCherry(board)}, 15000);
    
}