const container = document.querySelector("#keyboard");
const screen1 = document.getElementById("calc-p1");
const screen2 = document.getElementById("calc-p2");
const screen3 = document.getElementById("calc-p3");


let firstNumber, secondNumber, operator, result;

const operations = {
    '+': function add() {
        return firstNumber + secondNumber;
    },
    '-': function remove() {
        return firstNumber - secondNumber;
    },
    '×': function multiply() {
        return firstNumber * secondNumber;
    },
    '÷': function divide() {
        return firstNumber / secondNumber;
    }
}

function clear() {
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
    result = undefined;
}

function merge(current, value) {
    return Number(current ? current + value : value)
}

function populate(target) {
    const value = target.innerText;

    if (value === "AC") {
        return clear();
    }

    switch (target.getAttribute('data-type')) {
        case "number": {
            if (operator) {
                secondNumber = merge(secondNumber, value);
            } else {
                firstNumber = merge(firstNumber, value);
            }
            break;
        }
        case "operator": {
            operator = value;
            break;
        }
        case "equal": {
            const operation = operations[operator];
            result = operation();
            firstNumber = undefined;
            secondNumber = undefined;
            break;
        }
    }
}

function render() {
    screen3.innerHTML = '';
    screen2.innerHTML = '';
    screen1.innerHTML = '';

    if (result) {
        screen3.innerHTML = result;
        clear();
        return;
    }

    if (secondNumber) {
        screen1.innerHTML = `${firstNumber}  ${operator}`;
        screen2.innerHTML = '';
        screen3.innerHTML = secondNumber;
        return;
    }

    if (operator) {
        screen2.innerHTML = `${firstNumber}  ${operator}`;
        screen3.innerHTML = '';
        return;
    }

    if (firstNumber) {
        screen3.innerHTML = firstNumber;
    }
}

container.addEventListener("click", (event) => {
    const { target } = event;

    if (!(target instanceof HTMLButtonElement)) {
        return void 0;
    }

    populate(target);
    render();
});

function display() {
    screen3.textContent += this.textContent;
}
