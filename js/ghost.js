'use strict'

const GHOST = '&#9781'; // in the HTML <i class="fas fa-ghost" style="font-size:30px"></i>
var gGhosts;
var gIntervalGhosts;
var gKilledGhosts = [];

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor()

    }
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost);

}

function createGhosts(board) {
    gGhosts = [];
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // console.log('ghost.location', ghost.location)
    // figure out moveDiff, nextLocation, nextCell

    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === SUPER_FOOD) return
    // hitting a pacman?  call gameOver
    if (nextCell === PACMAN_IMG) {
        if(gPacman.isSuper) return;
        gameOver();
        return
    }

    
    // moving from current position:
    // update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // Move the ghost to new location
    // update the model
    ghost.location = {
        i: nextLocation.i,
        j: nextLocation.j
    }
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getGhostHTML(ghost) {
    var color = (gPacman.isSuper) ? 'white' : ghost.color
    return `<span><i class="fas fa-ghost" style="color:${color}; font-size:30px"></i></span>`
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

function changeGhostsColor(){
    for (var i=0; i< gGhosts.length; i++){
        var ghost = gGhosts[i];
        getGhostHTML(ghost);
    }
    return gGhosts;
}

function removeGhost(ghosts, nextLocation){
    for (var i = 0; i < ghosts.length; i++) {
        var ghost = ghosts[i];
        if (ghost.location.i === nextLocation.i && ghost.location.j === nextLocation.j) {
            gKilledGhosts.push(ghost);
            ghosts.splice(i, 1);
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
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN // PACMAN
    // update the DOM
    renderCell(gPacman.location, getPacmanHTML())
    return ghosts;
}