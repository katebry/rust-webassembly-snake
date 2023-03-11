import init, {World} from "snake_game"

init().then(_ => {
    const CELL_SIZE = 10;
    const canvas = document.getElementById("snake-canvas");
    const context = canvas.getContext("2d");
    // from Rust
    const world = World.new();
    const width = world.width();

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

    drawWorld();
})