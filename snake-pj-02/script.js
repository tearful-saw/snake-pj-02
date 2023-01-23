let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i < 101; i++) {
    let cell = document.createElement('div');
    field.appendChild(cell);
    cell.classList.add('cell');
}

let cell = document.getElementsByClassName('cell');
let x = 1;
let y = 10;

for (let i = 0; i < cell.length; i++) {
    if (x > 10) {
        x = 1;
        y--;
    }
    cell[i].setAttribute('posX', x);
    cell[i].setAttribute('posY', y);
    x++;
};

function generateSnake() {
    let posX = Math.round(Math.random() * (7) + 3);
    let posY = Math.round(Math.random() * (9) + 1);
    return [posX, posY];
}

let coordinate = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinate[0] + '"][posY = "' + coordinate[1] + '"]'),
    document.querySelector('[posX = "' + (coordinate[0] - 1) + '"][posY = "' + coordinate[1] + '"]'),
    document.querySelector('[posX = "' + (coordinate[0] - 2) + '"][posY = "' + coordinate[1] + '"]')
]

for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add("snakeBody");
}
snakeBody[0].classList.add("snakeHead");

let apple;

function createApple() {
    function generateApple() {
        let posX = Math.round(Math.random() * (9) + 1);
        let posY = Math.round(Math.random() * (9) + 1);
        return [posX, posY];
    };
    let appleCoordinates = generateApple();

    apple = document.querySelector('[posX = "' + appleCoordinates[0] + '"][posY = "' + appleCoordinates[1] + '"]');


    while (apple.classList.contains('snakeBody')) {
        function generateApple() {
            let posX = Math.round(Math.random() * (9) + 1);
            let posY = Math.round(Math.random() * (9) + 1);
            return [posX, posY];
        };
    }
    apple.classList.add('apple');
};
createApple();
let direction = 'right';
let steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
let score = 0;
input.value = `Счет: ${ score }`;
let input2 = document.createElement('input');
document.body.appendChild(input2);




function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('snakeHead');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();
    if (direction == 'right') {
        if (snakeCoordinates[0] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'))
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'))
        };
    } else if (direction == 'left') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'))
        } else {
            snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'))
        };
    } else if (direction == 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] - 1) + '"]'))
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'))
        };
    } else if (direction == 'up') {
        if (snakeCoordinates[1] < 10) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'))
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'))
        };
    };

    if (snakeBody[0].getAttribute('posX') == apple.getAttribute('posX') && snakeBody[0].getAttribute('posY') == apple.getAttribute('posY')) {
        apple.classList.remove('apple');
        let x = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let y = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX ="' + x + '"][posY ="' + y + '"]'));
        createApple();
        score++;
        input.value = `Счет: ${ score }`;

        localStorage.setItem('number', score.toString());

    }

    if (snakeBody[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            alert(`Игра оконченаю. Счет: ${score}`);
        }, 200)

        clearInterval(interval);
        snakeBody[0].style.backgroundColor = "blue";

    }

    snakeBody[0].classList.add('snakeHead');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add("snakeBody");
    }
    steps = true;
}

let interval = setInterval(move, 300);

window.addEventListener('keydown', (KeyboardEvent) => {
    if (steps == true) {
        if (KeyboardEvent.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps = false;
            //console.log('left');
        } else if (KeyboardEvent.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps = false;
            // console.log('up');
        } else if (KeyboardEvent.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps = false;
            // console.log('right');
        } else if (KeyboardEvent.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps = false;
            //console.log('down');
        }
    }

});


let localRecord = +localStorage.getItem('number');

input2.value = `Рекорд: ${localRecord }`;

//сделать список очков и выбрать максимальный