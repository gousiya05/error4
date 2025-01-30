// Select the canvas and set up the context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 320;
canvas.height = 480;

// Game variables
let bird = { x: 50, y: 150, width: 20, height: 20, velocity: 0, gravity: 0.5 };
let pipes = [];
let pipeWidth = 40, pipeGap = 100, pipeSpeed = 2;
let score = 0;

// Function to create pipes
function createPipe() {
    let pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 20;
    pipes.push({ x: canvas.width, y: 0, height: pipeHeight }); // Top pipe
    pipes.push({ x: canvas.width, y: pipeHeight + pipeGap, height: canvas.height - pipeHeight - pipeGap }); // Bottom pipe
}

// Bird controls
document.addEventListener("keydown", () => bird.velocity = -7);

// Game loop
function update() {
    // Bird movement
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Move pipes
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= pipeSpeed;
    }

    // Remove off-screen pipes
    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);

    // Add new pipes
    if (pipes.length === 0 || pipes[pipes.length - 2].x < canvas.width - 150) {
        createPipe();
    }

    // Collision detection
    for (let pipe of pipes) {
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            bird.y < pipe.y + pipe.height ||
            bird.y + bird.height > pipe.y && pipe.y > 0
        ) {
            alert("Game Over! Score: " + score);
            document.location.reload();
        }
    }

    // Check if bird hits the ground or flies too high
    if (bird.y > canvas.height || bird.y < 0) {
        alert("Game Over! Score: " + score);
        document.location.reload();
    }

    // Update score
    if (pipes.length > 0 && pipes[0].x + pipeWidth < bird.x && pipes[0].y === 0) {
        score++;
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.fillStyle = "yellow";
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Draw pipes
    ctx.fillStyle = "green";
    for (let pipe of pipes) {
        ctx.fillRect(pipe.x, pipe.y, pipeWidth, pipe.height);
    }

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

// Main game function
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game
createPipe();
gameLoop();
