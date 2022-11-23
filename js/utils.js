'use strict'

function renderBoard(mat = gBoard, selector = '.board-container') {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
            var curr = mat[i][j]
            var cell = (curr.isMine) ? MINE : mat[i][j].minesAroundCount
            if (cell === 0) cell = ''
            var className = `cell cell-${i}-${j}`
            if (curr.isShown) {
                className += ` shown`
            } else if (curr.isMarked) {
                cell = FLAG
            } else {
                cell = ''
            }

            strHTML += `<td class="${className}" onclick="cellClicked(${i},${j})" onmousedown="whichButton(${i},${j},event)">${cell}</td>`
        }

        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector) // update board
    elContainer.innerHTML = strHTML

    const eltxtMines = document.querySelector('.txtMinesOnBoard span')// update Mains left
    eltxtMines.innerText = gMinesOnBoard

    const eltxtCellCount = document.querySelector('.txtCellCount span')// update empty cell to open
    eltxtCellCount.innerText = gCellCount

    checkWin()

}

function countMinesNegs(cellI, cellJ, mat) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) negsCount++
            if (mat[i][j].isMine) negsCount++
        }
    }
    return negsCount
}

//not working at the moment
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value

}

function getCellLocation(elCell) {
    var i = +elCell.id.split('-')[1]
    var j = +elCell.id.split('-')[2]
    return { i, j }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getEmptyRamdomCell() {
    var emptyCells = []

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var curr = gBoard[i][j]
            if (!curr.isMine) emptyCells.push({ i: i, j: j })
        }
    }

    var randomCell = emptyCells[getRandomInt(0, emptyCells.length)] //return ex {i: 2, j: 4}
    return randomCell
}

function myTimer(){
    if(gTimer > 5000) gameOver(false)
    gTimer++

    const eltxtMyTimer = document.querySelector('.myTimer')// update myTimer
    eltxtMyTimer.innerText = gTimer
}



