
let canvas = document.getElementById("snake"); // criar elemento que irá rodar o jogo
let context = canvas.getContext("2d");
const box = 32;

const placar = document.getElementById("placar")
let pontos = parseInt(placar.textContent)

let snake = []; // criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] = {
    x: 8 * box,
    y: 8 * box
};

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
    }


function createBG() {
    context.fillStyle = "#CD5C5C";
    context.fillRect(0,0,16 * box, 16 * box); // desenha o retângulo usando x e y e a largura e altura setadas
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function createFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}


function update(event) {
    if (event.key == 'ArrowLeft' && direction != 'right') direction = 'left';
    if (event.key == 'ArrowUp' && direction != 'down') direction = 'up';
    if (event.key == 'ArrowRight' && direction != 'left') direction = 'right';
    if (event.key == 'ArrowDown' && direction != 'up') direction = 'down';
}

function startGame(){
    if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0, console.log(`x = ${snake[0].x}, y = ${snake[0].y}`);
    else if (snake[0].x < 0 && direction == 'left') snake[0].x = 15 * box, console.log(`x = ${snake[0].x}, y = ${snake[0].y}`);
    else if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0, console.log(`x = ${snake[0].x}, y = ${snake[0].y}`);
    else if (snake[0].y < 0 && direction == 'up') snake[0].y = 15 * box, console.log(`x = ${snake[0].x}, y = ${snake[0].y}`);

    for(i = 1; i< snake.length; i++){
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            clearInterval(game)
            snake = [];
            snake[0] = {
                x: 8 * box,
                y: 8 * box
            };
            $(".start").removeAttr("disabled");
        }
    }

    createBG();
    createSnake();
    createFood();
    

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if (direction == 'right'){
        snakeX += box;
    }
    if (direction == 'left'){
        snakeX -= box;
    }
    if (direction == 'up'){
        snakeY -= box;
    }
    if (direction == 'down'){
        snakeY += box;
        }

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop(); // pop tira o último elemento da lista
    }
    else{
        placar.textContent = pontos += 1
        food.x = Math.floor(Math.random() * 15 + 1) * box,
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead={
        x: snakeX,
        y: snakeY
    };
    snake.unshift(newHead);
}

document.addEventListener('keydown', update);
start = document.getElementById('start');
start.addEventListener('click', startButton);


function startButton(){
    start.setAttribute('disabled', '');
    game = setInterval(startGame, 100);
    placar.textContent = "0"
    pontos = 0;
}
let game = setInterval(startGame, 100);
