const path = require('path');

module.exports = {
    mode: 'development',
    entry: './static/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg|png|jpg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: './external/[name].[ext]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ],
    },
    plugins: [],
};
