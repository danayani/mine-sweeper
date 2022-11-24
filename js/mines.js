'use strict'

function getMinesOnBoard() {
    for (var z = 0; z < gLevel.MINES; z++) {
        gGame.shownCount--
        var ramdomCell = getEmptyRamdomCell()
        var indexI = ramdomCell.i
        var indexJ = ramdomCell.j

        gBoard[indexI][indexJ].isMine = true
    }
}

function setMinesNegsCount() {
    var curr
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            curr = gBoard[i][j]
            curr.minesAroundCount = countMinesNegs(i, j, gBoard)
        }
    }
}

function mineExpload() {
    gGame.lives--

    if (gGame.lives === 0) {
        gameOver(false)
    }
    console.log(gGame.lives)
    updateLives()
}

function showMines() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var curr = gBoard[i][j]
            if (curr.isMine) curr.isShown = true
        }
    }
    renderBoard()
}