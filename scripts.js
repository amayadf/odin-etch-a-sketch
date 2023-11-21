let squareAmount = 16;


function createSquares(amount) {
    for(let i = 0; i < amount; i++) {
        let square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
    }
}

//event listeners
let grid = document.querySelector('.grid');

