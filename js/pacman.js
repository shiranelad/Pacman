'use strict'
const PACMAN =  '➡️';
const PACMAN_IMG = 'img/pacman.png'
var gPacman;
var gKey = 'right';

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = getPacmanHTML()
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    // console.log('nextLocation', nextLocation)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost?  call gameOver
    else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhost(gGhosts, nextLocation);
        } else {
            gameOver();
        }
        return;
    }

    else if (nextCell === CHERRY) {
        updateScore(10);
    }

    else if (nextCell === FOOD || nextCell === SUPER_FOOD) {
        updateScore(1);
        checkWin();
        if (nextCell === SUPER_FOOD) {
            if (gPacman.isSuper) return;
            gPacman.isSuper = true;
            changeGhostsColor();
            setTimeout(() => {
                gPacman.isSuper = false;
                for (var i = 0; i < gKilledGhosts.length; i++) {
                    gGhosts.push(gKilledGhosts[i]);
                    gKilledGhosts.splice(i, 1);
                }
                for (var i = 0; i < gGhosts.length; i++) {
                    changeGhostsColor();
                }
            }, 5000)
        }
    }
    
    
    // moving from corrent position:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    
    // Move the pacman to new location
    // update the model
    gPacman.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    gBoard[gPacman.location.i][gPacman.location.j] = getPacmanHTML()
    // update the DOM
    renderCell(gPacman.location, getPacmanHTML())
    checkWin();
}

function getPacmanHTML() {
    var deg = 0;
    deg = (gKey === 'up') ? -90 : (gKey === 'down' ? 90 : (gKey === 'left' ? 180 : 0))
    return `<img class="pacman" style="transform:rotate(${deg}deg)" src="${PACMAN_IMG}">`
}


function getNextLocation(keyboardEvent) {
    // console.log('keyboardEvent.code', keyboardEvent.code)
    // figure out nextLocation
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (keyboardEvent.code) {
        case 'ArrowUp':
            gKey = 'up'
            nextLocation.i--
            break;
        case 'ArrowDown':
            gKey = 'down'
            nextLocation.i++
            break;
        case 'ArrowLeft':
            gKey = 'left'
            nextLocation.j--
            break;
        case 'ArrowRight':
            gKey = 'right'
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}
