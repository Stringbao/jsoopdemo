const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require("path");
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}`);

const merge = require('webpack-merge');


let webpackConfig = {
    entry: {
        index:'./src/index.js',
    },
    output: {
        path: path.resolve(__dirname, './dist/'),//输出结果
        filename: 'scripts/[name][hash:8].bundle.js',
        chunkFilename: 'scripts/[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                },
                exclude: /node_modules/
            },

            {
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'url-loader', options: { name: 'fonts/[name].[hash:8].[ext]' }//项目设置打包到dist下的fonts文件夹下
            },
            {
                test: /\.html$/,
                use: [{
                    loader:"html-loader",
                    options:{
                        root:path.resolve(__dirname, 'images')
                    }
                }],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: './index.html',
            template: './src/index.html',
            chunks: ['runtime', 'index', 'vender', 'common']
        }),
        // new HtmlWebPackPlugin({
        //     filename: './point.html',
        //     template: './src/views/point.html',
        //     chunks: ['runtime', 'point', 'vender', 'common']
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        // new webpack.ProvidePlugin({
        //     '$tool': [path.resolve(__dirname, "../../../nec-fe-tool/core.js"), 'default']
        // }),
    ],
    resolve: {
        extensions: ['.js', '.css', '.html'],
        alias: {
           "@CObject": path.resolve(__dirname, "./src/core/CObject.js"),
           "@CObstacle": path.resolve(__dirname, "./src/core/CObstacle.js"),
           "@CMonster": path.resolve(__dirname, "./src/core/CMonster.js"),
           "@Enums": path.resolve(__dirname, "./src/enum.js"),
           "@Tool": path.resolve(__dirname, "./src/util/tool.js"),
        }
    },
};
module.exports = merge(webpackConfig, _mergeConfig);