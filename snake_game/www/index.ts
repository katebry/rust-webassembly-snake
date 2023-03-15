import init, {World, Direction} from "snake_game";
import {random} from './utils/random';

init().then(wasm => {

    const CELL_SIZE = 30;
    const WORLD_WIDTH = 8;
    const snakeSpawnIndex = random(WORLD_WIDTH * WORLD_WIDTH);

    // from Rust
    const world = World.new(WORLD_WIDTH, snakeSpawnIndex);
    const width = world.width();

    const canvas = <HTMLCanvasElement>document.getElementById("snake-canvas");
    const context = canvas.getContext("2d");

    canvas.height = width * CELL_SIZE;
    canvas.width = width * CELL_SIZE;

    document.addEventListener("keydown", (event) => {
        switch (event.code) {
            case "ArrowUp":
                world.change_snake_direction(Direction.Up)
                break;
            case "ArrowDown":
                world.change_snake_direction(Direction.Down)
                break;
            case "ArrowLeft":
                world.change_snake_direction(Direction.Left)
                break;
            case "ArrowRight":
                world.change_snake_direction(Direction.Right)
                break;
        }
    })

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

    function drawReward() {
        const reward_index = world.reward_cell();
        const col = reward_index % width;
        const row = Math.floor(reward_index / width);

        context.beginPath();
        context.fillStyle = "#FF0000";

        context.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE,
        );

        context.stroke();
    }

    function drawSnake() {
        const snakeCells = new Uint32Array(
            wasm.memory.buffer,
            world.snake_cells(),
            world.snake_length()
        );

        snakeCells.forEach((cellIndex, i) => {
            const col = cellIndex % width;
            const row = Math.floor(cellIndex / width);

            context.fillStyle = i === 0 ? "#7878db" : "#000000";

            context.beginPath();
            context.fillRect(
                col * CELL_SIZE,
                row * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE,
            );
        })
        context.stroke();
    }

    function paintCanvas() {
        drawWorld();
        drawReward();
        drawSnake();
    }

    function update() {
        const fps = 10;
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