use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen(module = "/www/utils/random.js")]
extern {
    fn random(number: usize) -> usize;
}

#[wasm_bindgen]
#[derive(PartialEq)]
pub enum Direction {
    Up,
    Down,
    Left,
    Right,
}

#[derive(Clone, Copy)]
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
    // Option can hold a value OR no value (so can be null... except not because Rust)
    next_cell: Option<SnakeCell>,
    reward_cell: usize,
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, snake_spawn_index: usize) -> World {
        let size = width * width;
        let reward_cell = random(size);
        World {
            width,
            size,
            snake: Snake::new(snake_spawn_index, 3),
            next_cell: None,
            reward_cell,
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn snake_index(&self) -> usize {
        self.snake.body[0].0
    }

    pub fn reward_cell(&self) -> usize {
        self.reward_cell
    }

    pub fn change_snake_direction(&mut self, direction: Direction) {
        let next_cell = self.generate_next_snake_cell(&direction);

        if self.snake.body[1].0 == next_cell.0 { return; }

        self.next_cell = Some(next_cell);
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

        match self.next_cell {
            Some(cell) => {
                self.snake.body[0] = cell;
                self.next_cell = None;
            }
            None => {
                self.snake.body[0] = self.generate_next_snake_cell(&self.snake.direction);
            }
        }

        let length = self.snake.body.len();

        for i in 1..length {
            self.snake.body[i] = SnakeCell(temp[i - 1].0);
        }
    }

    fn generate_next_snake_cell(&self, direction: &Direction) -> SnakeCell {
        let snake_index = self.snake_index();
        let row = snake_index / self.width();

        return match direction {
            Direction::Right => {
                SnakeCell((row * self.width()) + (snake_index + 1) % self.width)
            }
            Direction::Left => {
                SnakeCell((row * self.width()) + (snake_index - 1) % self.width)
            }
            Direction::Up => {
                SnakeCell((snake_index - self.width()) % self.size)
            }
            Direction::Down => {
                SnakeCell((snake_index + self.width()) % self.size)
            }
        };
    }
}
