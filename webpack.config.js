const path = require("path");
const webpack = require("webpack");

module.exports = env => {
    
    return{
        entry:{
            display:"./src/display.js"
        },
        output: {
            path: path.resolve(__dirname,"public/dist"),
            filename: "bundle.js"
        },
        node: {
            fs:"empty"
        },
        target: "web",
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
            new webpack.HotModuleReplacementPlugin({
            }),
            new webpack.DefinePlugin({
                "process.env.REACT_APP_KEY":JSON.stringify((process.env.REACT_APP_KEY) || "MY_API_KEY")
            })
        ]


    }
};

