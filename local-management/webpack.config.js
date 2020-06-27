const path = require("path");
module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "src"),
                //exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/react"],
                        plugins: [
                            "@babel/plugin-syntax-dynamic-import",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
            /*{
                test: /\.svg$/,
                use: [
                    {
                        loader: "svg-url-loader",
                        options: {
                            limit: 10000
                        }
                    }
                ]
            }*/
        ]
    }
};
