const DEFAULT_SIZE = 4;
const DEFAULT_MODE = 'color';
const DEFAULT_COLOR =  '#0fc9ee';

let size = DEFAULT_SIZE;
let mode = DEFAULT_MODE;
let color = DEFAULT_COLOR;

//html elements
let grid = document.querySelector('.grid');
let colorButtons = document.querySelectorAll('.color-options button');
let colorPicker = document.querySelector('#color-input');
let clearButton = document.querySelector('.grid-options button');
let slider = document.querySelector('.slider');
let gridSize = document.querySelector('.grid-options label')

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

//grid functions
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

function clearGrid() {
    let gridPixels = document.querySelectorAll('.grid div');
    gridPixels.forEach(gridPixel => gridPixel.style.backgroundColor = '#ffffff')
}

function resetGrid() {
    let gridPixels = grid.querySelectorAll('div');
    gridPixels.forEach(gridPixel => gridPixel.remove());
}

//mode functions
function updateButtons() {
    (document.getElementById(mode)).classList.toggle('active');
}

//color functions
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

function generateRandomRGB() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    return `rgb(${x}, ${y}, ${z})`;  
}

//event handlers
function handleColorButtonClick(e) {
    updateButtons();
    mode = e.target.dataset.mode;
    updateButtons();
    if(mode == 'color') {
        colorPicker.click();
    }
}

function handleSliderInput(e) {
    size = e.target.value;
    gridSize.textContent = `${size} x ${size}`;
    resetGrid();
    createGrid();
}

function handleColorPickerInput(e) {
    color = e.target.value;
}

//create grid with the default size when the site loads
createGrid();

//event listeners
colorButtons.forEach(colorButton => colorButton.addEventListener('click', handleColorButtonClick));
clearButton.addEventListener('click', clearGrid);
slider.addEventListener('input', handleSliderInput);
colorPicker.addEventListener('input', handleColorPickerInput);
colorPicker.addEventListener('change', handleColorPickerInput);

