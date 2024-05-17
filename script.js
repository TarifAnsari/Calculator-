// Get all the buttons and the screen
const buttons = document.querySelectorAll('.btn');
const screen = document.querySelector('.screen');
const history = document.querySelector('.history');

let currentNumber = '';
let prevNumber = '';
let operator = '';
let resultDisplayed = false;

// Function to update the screen with the current number
function updateScreen() {
    screen.textContent = currentNumber;
}

// Function to handle number button clicks
function handleNumberClick(number) {
    if (resultDisplayed) {
        currentNumber = '';
        resultDisplayed = false;
    }
    currentNumber += number;
    updateScreen();
}

// Function to handle operator button clicks
function handleOperatorClick(op) {
    if (currentNumber !== '') {
        if (prevNumber !== '') {
            handleEqualsClick();
        }
        prevNumber = currentNumber;
        currentNumber = '';
        operator = op;
        history.textContent = prevNumber + ' ' + operator;
    }
}

// Function to handle equals button click
function handleEqualsClick() {
    if (currentNumber === '') return;

    let result;
    if (operator === '+') {
        result = parseFloat(prevNumber) + parseFloat(currentNumber);
    } else if (operator === '-') {
        result = parseFloat(prevNumber) - parseFloat(currentNumber);
    } else if (operator === '*') {
        result = parseFloat(prevNumber) * parseFloat(currentNumber);
    } else if (operator === '/') {
        result = parseFloat(prevNumber) / parseFloat(currentNumber);
    } else if (operator === '%') {
        result = parseFloat(prevNumber) % parseFloat(currentNumber);
    }

    // Update screen with the result
    screen.textContent = result;
    history.textContent = '';
    currentNumber = result.toString();
    prevNumber = '';
    operator = '';
    resultDisplayed = true;
}

// Function to handle clear button click
function handleClearClick() {
    currentNumber = '';
    prevNumber = '';
    operator = '';
    history.textContent = '';
    updateScreen();
}

// Function to handle delete button click
function handleDeleteClick() {
    currentNumber = currentNumber.slice(0, -1);
    updateScreen();
}

// Add event listeners to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        if (!isNaN(buttonText) || buttonText === '.') {
            handleNumberClick(buttonText);
        } else if (buttonText === 'C') {
            handleClearClick();
        } else if (buttonText === 'DEL') {
            handleDeleteClick();
        } else if (buttonText === '=') {
            handleEqualsClick();
        } else {
            handleOperatorClick(buttonText);
        }
    });
});