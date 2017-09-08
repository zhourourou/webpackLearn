const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//引入HtmlWebpackPlugin插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');//引入ExtractTextPlugin插件
module.exports = {
    //唯一入口文件
    entry: __dirname + "/app/main.js",
    // 出口文件
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },
    // 打包方式速度
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"//babel
                },
                exclude: /node_modules///除去node_modules
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"//打包css和js在一个文件中
                    },
                    {
                        loader: "css-loader",//打包css和js在一个文件中
                        options: {
                            modules: true//css module,类名模块化
                        }
                    },
                    {
                        loader: "postcss-loader"//添加css前缀
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),//版权声明插件
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),//外部插件，生成自动引用打包js文件的index.html
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),//为组件分配ID
        new webpack.optimize.UglifyJsPlugin(),//压缩JS文件
        new ExtractTextPlugin("style.css"),//外部插件，分离css和js文件
    ],
};

