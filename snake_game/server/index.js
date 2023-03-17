const compression = require("compression");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const publicFolder = path.join(__dirname, "..", "www", "public");

app.use(compression());
app.use(express.static(publicFolder));

app.get("/", (_, res) => {
    res.sendFile("index.html")
})

app.listen(port, () => {
    console.log("listening...")
})