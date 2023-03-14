use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[derive(PartialEq)]
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

struct SnakeCell(usize);

struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction,
}

impl Snake {
    fn new(spawn: usize) -> Snake {
        Snake {
            body: vec!(SnakeCell(spawn)),
            direction: Direction::Down,
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    size: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, snake_spawn_index: usize) -> World {
        World {
            width,
            size: width * width,
            snake: Snake::new(snake_spawn_index),
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn snake_index(&self) -> usize {
        self.snake.body[0].0
    }

    pub fn update(&mut self) {
        let snake_index = self.snake_index();
        let row = snake_index / self.width;
        let col = snake_index % self.width;

        if self.snake.direction == Direction::Right {
            let next_col = (snake_index + 1) % self.width;
            self.snake.body[0].0 = (row * self.width) + next_col;
        }
        if self.snake.direction == Direction::Left {
            let next_col = (snake_index - 1) % self.width;
            self.snake.body[0].0 = (row * self.width) + next_col;
        }
        if self.snake.direction == Direction::Up {
            let next_row = (row - 1) % self.width;
            self.snake.body[0].0 = (next_row * self.width) + col;
        }
        if self.snake.direction == Direction::Down {
            let next_row = (row + 1) % self.width;
            self.snake.body[0].0 = (next_row * self.width) + col;
        }
    }
}
