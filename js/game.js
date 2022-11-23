'use strict'
var gBoard
var gLevel
var gMinesOnBoard
var gCellCount
var gMyTimerId
var gTimer
var isGameOn

var gGame

// const BOOM = '#'
// const FOOD = '○'
// const EMPTY = ' '
const MINE = '💣'
const FLAG = '🚩'



function initGame() {
    startLevel()
    gCellCount = 0
    gMyTimerId = null
    gTimer = 0
    gBoard = startBoard()
    gMinesOnBoard = gBoard.length
    //gMinesOnBoard = 0
    getMinesOnBoard(gMinesOnBoard)
    setMinesNegsCount()

    renderBoard(gBoard)
    console.log(gBoard)
    console.log(gCellCount)

    
}
function startGame(){
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
       }
       
}

function gameOver(isWin){
    if(!isWin) showMines()
    console.log('win ?', isWin)
    clearInterval(gMyTimerId)
}

function checkWin(){
    if(gCellCount === 0) gameOver(true)
}

function startBoard() {
    const size = 4
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            gCellCount++
            var curr = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i].push(curr)
        }
    }
    return board
}

function getMinesOnBoard(amount){
    
    for(var z = 0; z < amount;z++){
        gCellCount--
        var ramdomCell = getEmptyRamdomCell()
        var indexI = ramdomCell.i
        var indexJ = ramdomCell.j

        gBoard[indexI][indexJ].isMine = true
    }
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

function showNegs(cellI, cellJ, mat = gBoard) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if (!mat[i][j].isShown){
                gCellCount--
                mat[i][j].isShown = true
            } 
        }
    }
}

function cellClicked(i,j){
    if(!gMyTimerId) gMyTimerId = setInterval(myTimer,1000)
    var curr = gBoard[i][j]

    if(curr.isMine) mineExpload()
    if(curr.isShown) return
    if(curr.minesAroundCount > 0){
        curr.isShown = true
        gCellCount--
    }
    if(curr.minesAroundCount === 0)showNegs(i,j)
    
    renderBoard(gBoard)
}

function whichButton(i, j, evCell){
    
    if(evCell.button === 2){
        gBoard[i][j].isMarked = true
        renderBoard()
    } 
}

function mineExpload(){
    gameOver(false)
}

function showMines(){

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var curr = gBoard[i][j]
            if(curr.isMine) curr.isShown = true 
        }
    }
    renderBoard()
}







