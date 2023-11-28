const DEFAULT_SIZE = 4;
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR =  '#0fc9ee';

let size = DEFAULT_SIZE;
let mode = DEFAULT_MODE;
let color = DEFAULT_COLOR;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//functions to update
function updateSize(newSize) {
    size = newSize;
}

function updateColor(newColor) {
    color = newColor;
    mode = 'color';
}

function createGrid(){
    pixelAmount = size * size;
    for(let i = 0; i < pixelAmount; i++) {
        let gridPixel = document.createElement('div');
        gridPixel.addEventListener('mouseover', colorPixel);
        gridPixel.addEventListener('mousedown', colorPixel);
        grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        grid.insertAdjacentElement('beforeend', gridPixel);
    }
}

//function to change mode
function changeMode(event) {
    mode = event.target.id;
}

//function to color pixel
function colorPixel(e) {
    if(e.type === 'mouseover' && !mouseDown) return
    switch(mode){
        case 'color':
            this.style.backgroundColor = color;
            break;
        case 'rainbow':
            this.style.backgroundColor = generateRandomRGB();
            break;
        case 'monochrome':
            this.style.backgroundColor = '#000000';
            break;
        case 'eraser':
            this.style.backgroundColor = '#ffffff';
            break;
    }
}

//function to clear grid
function clearGrid() {
    let gridPixels = document.querySelectorAll('.grid div');
    gridPixels.forEach(gridPixel => gridPixel.style.backgroundColor = '#ffffff')
}

function resetGrid() {
    let gridPixels = grid.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.remove());
}


//obtaining elements from the document
let grid = document.querySelector('.grid');
let colorButtons = document.querySelectorAll('.color-options button');
let clearButton = document.querySelector('.grid-options button');
let slider = document.querySelector('.slider');
let gridSize = document.querySelector('.grid-options label')
let colorPicker = document.querySelector('.color-picker');

//event listeners
colorButtons.forEach(colorButton => colorButton.addEventListener('click', (e) => {
    changeMode(e);
    updateButtons();
}));
clearButton.addEventListener('click', clearGrid);
slider.addEventListener('input', (e) => {
    updateSize(e.target.value);
    gridSize.textContent = `${size} x ${size}`;
    resetGrid();
    createGrid();
});
colorPicker.addEventListener('input', (e) => {
    updateColor(e.target.value);
    updateButtons();
});

//create grid with the default size when the site loads
createGrid();

//helper functions
function generateRandomRGB() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    return `rgb(${x}, ${y}, ${z})`;  
}

function updateButtons() {
    colorButtons.forEach(colorButton => {
        if(colorButton.id == mode) {
            colorButton.classList.add('active');
        }
        else {
            colorButton.classList.remove('active');
        }
    })
    if(mode == 'color') {
        colorPicker.classList.add('active');
    }
    else{
        colorPicker.classList.remove('active');
    }
}