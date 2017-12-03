const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob'); // #PurifyCSSPlugin
const PurifyCSSPlugin = require('purifycss-webpack'); // #PurifyCSSPlugin


const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: './'
})
const cssConfig = isProd ? cssProd : cssDev;



module.exports = {
    entry: {
        app: './src/index.js',
        
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
                  
              },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
              },
              {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=img/',
                    'image-webpack-loader'
                ]
                  
              },
              { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
              { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
              { test: /\.(webm|mp4)$/, loader: 'file-loader?name=video/[name].[ext]' },
            ]
          },
    devServer: {          
            compress: true,
            port: 9000,
            stats: "errors-only",
            hot: true,
            open: true
        },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Diwanee',
          minify: {
              collapseWhitespace: true
          },
          hash: true,
          template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
       
         
          new ExtractTextPlugin({
            filename: './app.css',
            disable: !isProd,
            allChunks: true
          }),
          
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new PurifyCSSPlugin({ // #PurifyCSSPlugin
          // Give paths to parse for rules. These should be absolute!
          paths: glob.sync(path.join(__dirname, 'src/*.html')),
          
        })
      ]
}