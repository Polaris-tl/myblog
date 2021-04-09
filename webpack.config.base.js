const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
    entry: './src/index.tsx',
    output: {
        path: resolve('dist'),
        filename: '[name]_[hash:8].js',
        // publicPath: "/",
    },
    module: {
        rules: [{
                test: /\.tsx?$/i,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        "plugins": [
                            [
                                "import",
                                {
                                    "libraryName": "antd",
                                    "style": "css"
                                }
                            ]
                        ]
                    }
                }, 'ts-loader'],
                // exclude: /node_modules/
            },
            {
                test: /\.(less|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: "[name]_[local]_[hash:8]"
                            }
                        }
                    },
                    'less-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(less|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ],
                include: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: '[name]_[hash:8].[ext]',
                    outputPath: 'static/images/'
                },
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            '@': resolve('./src/components'),
            '@src': resolve('./src/')
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[origin]_[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'polaris'
        }),
    ]
}