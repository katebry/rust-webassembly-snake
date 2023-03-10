const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    // entry files
    entry: "./index.js",
    // output bundles (location)
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "index.js"
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