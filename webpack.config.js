const path = require("path");
const Dotenv = require("dotenv-webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry:{
        display:"./src/display.js"
    },
    output: {
        path: path.resolve(__dirname,"dist"),
        filename: "bundle.js"
    },
    node: {
        fs:"empty"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react"]
                        }
                    }
                ]
            }
        ]
    },
    
    devServer: {
        compress: true,
        index: "index.html",
        host: "localhost",
        port: 8080,
        hot: true,
        publicPath: "/dist/",
        open: true
    },
    plugins: [
        new Dotenv({
            path:"./.env"
        }),
        new webpack.HotModuleReplacementPlugin({
        })
    ]
};

