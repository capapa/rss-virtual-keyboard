const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    module: {
        rules: [
                {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },{
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                'src/styles/vars.scss',
                            ]
                         }
                    }
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
    ],
    devServer: {
        compress: true,
        port:3000,
    }
  };