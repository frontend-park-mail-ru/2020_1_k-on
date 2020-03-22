const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: 'development',
    entry: './static/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    watch: true,
    resolve: {
        alias: {
            views: path.resolve(__dirname, 'static/js/views'),
            components: path.resolve(__dirname, 'static/js/components'),
            fonts: path.resolve(__dirname, 'static/fonts'),
            css: path.resolve(__dirname, 'static/css'),
            libs: path.resolve(__dirname, 'static/js/libs'),
            controllers: path.resolve(__dirname, 'static/js/controllers'),
        },
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [autoprefixer()],
                        },
                    },
                    {loader: 'sass-loader'},
                ],
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg|png|jpg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: './external/[name].[ext]',
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.xml$/,
                loader: 'fest-webpack-loader',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
};
