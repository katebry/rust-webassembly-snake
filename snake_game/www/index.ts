import init, {World} from "snake_game"

init().then(_ => {
    const CELL_SIZE = 30;
    const WORLD_WIDTH = 8;
    const snakeSpawnIndex = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);

    // from Rust
    const world = World.new(WORLD_WIDTH, snakeSpawnIndex);
    const width = world.width();

    const canvas = <HTMLCanvasElement> document.getElementById("snake-canvas");
    const context = canvas.getContext("2d");

    canvas.height = width * CELL_SIZE;
    canvas.width = width * CELL_SIZE;

    function drawWorld() {
        context.beginPath();

        for (let x = 0; x < width + 1; x++) {
            context.moveTo(CELL_SIZE * x, 0);
            context.lineTo(CELL_SIZE * x, width * CELL_SIZE);
        }

        for (let y = 0; y < width + 1; y++) {
            context.moveTo(0, CELL_SIZE * y);
            context.lineTo(width * CELL_SIZE, CELL_SIZE * y);
        }

        context.stroke();
    }

    function drawSnake() {
        const snakeIndex = world.snake_index();
        const col = snakeIndex % width;
        const row = Math.floor(snakeIndex / width);

        context.beginPath();
        context.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE,
        );
        context.stroke();
    }

    function paintCanvas() {
        drawWorld();
        drawSnake();
    }

    function update() {
        const fps = 3;
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            world.update();
            paintCanvas();
            requestAnimationFrame(update);
        }, 1000 / fps)
    }

    paintCanvas();
    update();
})