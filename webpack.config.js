const path = require('path');

module.exports = {
    entry: {
        index: './src/js/index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|es6)$/,
                loader: 'babel-loader',
                query: {
                    compact: true,
                    minified: true,
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
            },
            {
                test: /\.(s[a|c]ss)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
            },
        ]
    },
    output: {
        path: path.resolve(__dirname)+'/public/js',
        filename: "[name].js",
        //libraryTarget: 'commonjs2',
    }
};