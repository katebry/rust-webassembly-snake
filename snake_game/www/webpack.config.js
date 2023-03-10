const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    // entry files
    entry: "./bootstrap.js",
    // output bundles (location)
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bootstrap.js"
    },
    // bundling mode
    mode: "development",
    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    // plugins
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "./index.html", to: "./"}
            ]
        })
    ]
}