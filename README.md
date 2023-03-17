# rust-webassembly-snake

This project was something I picked up during my time off between jobs.

I've used a mixture of Rust paired with WebAssembly, Webpack, Vanilla Typescript, basic CSS and HTML plus Express (for deployment purposes). 🦀

The goal was to get more familiar with Rust and to see how it can be used to make interactive web-based games.

----

To compile your Rust code into WebAssembly (so that this can be used with your frontend), run the command `wasm-pack build --target web` whilst in the `snake_game` folder

Then, `cd` to `www` folder, run the command `npm install` followed by `npm run dev`

Navigate to `localhost:8080` to see the game

If you want to deploy an update, run the command `npm run build` within the `www` folder. This will generate new files in your `pkg` folder

----
The app is deployed on Heroku and can be found here: 

// insert link