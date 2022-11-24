'use strict'
var gBoard
var gLevel
var gGame
var gMyTimerId
var gFirstClick
//var gCellCount
//var gGame.secsPasse
// var gGame.isOn

const MINE = '💣'
const FLAG = '🚩'
const HINT = '💡'
const START_IMG = '😊'
const WIN_IMG = '😎'
const LOSE_IMG = '😡'



function initGame(level = 1) {
    //inner data
    clearInterval(gMyTimerId)
    gMyTimerId = null
    startGame()
    updateLives()
    startLevel(level)
    gBoard = startBoard()
    // getMinesOnBoard()
    // setMinesNegsCount()
    gFirstClick = false

    //update DOM
    renderBoard(gBoard)
    var elStartBtn = document.querySelector('.startBtn')
    elStartBtn.innerText = START_IMG

    var elMyTimer = document.querySelector('.myTimer')
    elMyTimer.innerText = '000'

}

//change gLevel
function startLevel(level = 1) {
    var sizeFinal
    var minesFinal
    switch (level) {
        case 1:
            sizeFinal = 4
            minesFinal = 2
            break
        case 2:
            sizeFinal = 8
            minesFinal = 14
            break
        case 3:
            sizeFinal = 12
            minesFinal = 32
            break
    }
    gLevel = {
        SIZE: sizeFinal,
        MINES: minesFinal
    }

}

//change gGame
function startGame() {
    gGame = {
        isOn: true,
        shownCount: 0, //how many cell there is
        markedCount: 0,
        secsPassed: 0,
        lives:3
    }


}

//return board
function startBoard() {
    const size = gLevel.SIZE
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            gGame.shownCount++
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

function gameOver(isWin) {
    gGame.isOn = false
    if (!isWin) showMines()
    console.log('win ?', isWin)

    var elStartBtn = document.querySelector('.startBtn')
    elStartBtn.innerText = (isWin) ? WIN_IMG : LOSE_IMG
    clearInterval(gMyTimerId)
}

//gGame.shownCount = 0
function checkWin() {
    if (gGame.shownCount === 0) gameOver(true)
}

function showNegs(cellI, cellJ, mat = gBoard) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if (!mat[i][j].isShown) {
                gGame.shownCount--
                mat[i][j].isShown = true

                if (mat[i][j].minesAroundCount === 0) { //Full expand
                    showNegs(i, j)
                }
            }
        }
    }
}

function cellClicked(i, j) {
    if (!gGame.isOn) return

    var curr = gBoard[i][j]
    if (curr.isShown) return
    if (!gFirstClick) {
        curr.isShown = true
        gGame.shownCount--

        gFirstClick = true
        gMyTimerId = setInterval(myTimer, 1000)

        getMinesOnBoard()
        setMinesNegsCount()
    }

    if (curr.isMine){
        curr.isShown = true
        mineExpload()
    } 
    
    if (curr.minesAroundCount > 0) {
        curr.isShown = true
        gGame.shownCount--
    }

    if (curr.minesAroundCount === 0) showNegs(i, j)

    renderBoard(gBoard)
}

//put flag
function whichButton(i, j, evCell) {
    if (!gGame.isOn) return
    if (evCell.button === 2) {
        gBoard[i][j].isMarked = true
        renderBoard()
    }
}

//change the MOD for each level
function onLevelChange(level) {
    initGame(level)
    // gMyTimerId = null
    // clearInterval(gMyTimerId)
    // startGame()
    // startLevel(level)
    // gBoard = startBoard()
    // getMinesOnBoard()
    // setMinesNegsCount()
    // renderBoard()
}

//restart the game
function onStartBtn() {
    initGame()
}

function updateLives(){
    var msg = ''
    for(var i = 0; i < gGame.lives;i++){
        msg+=' ♥ '
    }
    renderElement('lives', msg)
}

// function mineExpload() {
//     gameOver(false)
// }

// function showMines() {

//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard.length; j++) {
//             var curr = gBoard[i][j]
//             if (curr.isMine) curr.isShown = true
//         }
//     }
//     renderBoard()
// }

// function getMinesOnBoard(amount) {

//     for (var z = 0; z < amount; z++) {
//         gCellCount--
//         var ramdomCell = getEmptyRamdomCell()
//         var indexI = ramdomCell.i
//         var indexJ = ramdomCell.j

//         gBoard[indexI][indexJ].isMine = true
//     }
// }

// function setMinesNegsCount() {
//     var curr
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard.length; j++) {
//             curr = gBoard[i][j]
//             curr.minesAroundCount = countMinesNegs(i, j, gBoard)
//         }
//     }
// }






