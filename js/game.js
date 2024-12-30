const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Game constants
const gridSize = 20;
const tileCount = canvas.width / gridSize;
const tileCountY = canvas.height / gridSize;

// Game variables
let snake = [
    { x: 10, y: 10 }
];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop = null;
let gameStarted = false;

// Colors
const snakeColor = '#4CAF50';
const foodColor = '#ff0000';

function drawGame() {
    clearCanvas();
    moveSnake();
    checkCollision();
    drawSnake();
    drawFood();
}

function clearCanvas() {
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        generateFood();
        updateScore();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCountY)
    };
    // Make sure food doesn't appear on snake
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCountY)
        };
    }
}

function updateScore() {
    score += 10;
    document.getElementById('scoreValue').textContent = score;
}

function checkCollision() {
    const head = snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCountY) {
        gameOver();
    }
    
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameLoop);
    gameStarted = false;
    alert(`遊戲結束！得分：${score}`);
    resetGame();
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 5, y: 5 };
    dx = 0;
    dy = 0;
    score = 0;
    document.getElementById('scoreValue').textContent = '0';
    document.getElementById('startButton').style.display = 'block';
}

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById('startButton').style.display = 'none';
        gameLoop = setInterval(drawGame, 100);
    }
}

// Event Listeners
document.addEventListener('keydown', (event) => {
    if (!gameStarted) return;
    
    switch (event.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

document.getElementById('startButton').addEventListener('click', startGame);

// Initial draw
clearCanvas();

// Game metadata and configuration
// Default settings for game initialization
// Last updated: 2024-12-31
// RkhGQ1RGe0g0UFDCpW5FM3fCpTM0Un0=