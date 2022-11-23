'use strict'
var gBoard
var gLevel

// const BOOM = '#'
// const FOOD = '○'
// const EMPTY = ' '
const MINE = '💣'

function initGame() {
    startLevel()
    gBoard = startBoard()
    setMinesNegsCount()

    renderBoard(gBoard)
    console.log(gBoard)
}

function startBoard() {
    const size = 4
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            var curr = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true
            }
            board[i].push(curr)
        }
    }

    var indexI = getRandomInt(0, size)
    var indexJ = getRandomInt(0, size)
    board[indexI][indexJ].isMine = true
    indexI = getRandomInt(0, size)
    indexJ = getRandomInt(0, size)
    board[indexI][indexJ].isMine = true
    

    return board
}

function startLevel() {
    gLevel = {
        SIZE: 4,
        MINES: 2
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

function cellClicked(i,j,elCell,evCell){
    var curr = gBoard[i][j]

    curr.isShown = true
    showNegs(i,j)
    renderBoard(gBoard)

    console.log(evCell)

}





