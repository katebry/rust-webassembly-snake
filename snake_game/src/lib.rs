use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}

#[derive(Clone)]
pub struct SnakeCell(usize);

struct Snake {
    body: Vec<SnakeCell>,
    direction: Direction,
}

impl Snake {
    fn new(spawn: usize, size: usize) -> Snake {
        let mut body = vec!();

        for i in 0..size {
            body.push(SnakeCell(spawn - i))
        }

        Snake {
            body,
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
            snake: Snake::new(snake_spawn_index, 3),
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn snake_index(&self) -> usize {
        self.snake.body[0].0
    }

    pub fn change_snake_direction(&mut self, direction: Direction) {
        self.snake.direction = direction
    }

    pub fn snake_length(&self) -> usize {
        self.snake.body.len()
    }

    pub fn snake_cells(&self) -> *const SnakeCell {
        self.snake.body.as_ptr()
    }

    pub fn update(&mut self) {
        let temp = self.snake.body.clone();
        let next_cell = self.generate_next_snake_cell();
        self.snake.body[0] = next_cell;

        let length = self.snake.body.len();

        for i in 1..length {
            self.snake.body[i] = SnakeCell(temp[i - 1].0);
        }
    }

    fn generate_next_snake_cell(&self) -> SnakeCell {
        let snake_index = self.snake_index();
        let row = snake_index / self.width();

        return match self.snake.direction {
            Direction::Right => {
                SnakeCell((row * self.width()) + (snake_index + 1) % self.width)
            },
            Direction::Left => {
                SnakeCell((row * self.width()) + (snake_index - 1) % self.width)
            },
            Direction::Up => {
                SnakeCell((snake_index - self.width()) % self.size)
            },
            Direction::Down => {
                SnakeCell((snake_index + self.width()) % self.size)
            }
        };
    }
}
