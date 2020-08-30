module.exports = {
    module: {
        rules: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader"
        }
    }
};
