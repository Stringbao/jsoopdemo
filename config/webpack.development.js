const path = require("path");
const SSICompileWebpackPlugin = require('ssi-webpack-plugin');
module.exports = {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    limit: 8192,
                    outputPath: 'static/images'
                }
            },
        ]
    },
    devServer: {
        inline: true,
        port: "9991",
        proxy: {
            '/accountAPI': {
                target: 'https://account.nec.lenovouat.cn',
                // pathRewrite: {
                //     "^/accountAPI": ""
                // },
                secure: false,
                changeOrigin: true
            }
        },
        //404 页面返回 index.html
        historyApiFallback: true,
    },
    plugins: [
        // new SSICompileWebpackPlugin({
        //     localBaseDir: path.resolve(__dirname, '../../../../nec-fe-2c-inc'),
        //     publicPath: ''
        // })
    ],
    devtool: 'eval-source-map'
}