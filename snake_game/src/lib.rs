use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

struct SnakeCell(usize);

struct Snake {
    body: Vec<SnakeCell>
}

impl Snake {
    fn new(spawn: usize) -> Snake {
        Snake {
            body: vec!(SnakeCell(spawn))
        }
    }
}

#[wasm_bindgen]
pub struct World {
    width: usize,
    snake: Snake,
}

#[wasm_bindgen]
impl World {
    pub fn new() -> World {
        World {
            width: 8,
            snake: Snake::new(10),
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
        self.snake.body[0].0 = snake_index + 1;
    }
}
