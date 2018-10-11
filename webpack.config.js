const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const entries = {
  pageOne: './index.js',
  pageTwo: './another-module.js'
};

const srcPath = path.resolve(__dirname, './src');
const buildPath = path.resolve(__dirname, './dist');

module.exports = (env, args) => {
  const production = args.mode === 'production';
  const watch = args.watch || false;

  return {
    context: srcPath,
    entry: entries,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[id].[chunckhash].js'
    },
    node: {
      fs: "empty"
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('postcss-import')({root: loader.resourcePath}),
                  require('postcss-preset-env')(),
                  require('cssnano')()
                ]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'eslint-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }],
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new StyleLintPlugin({
        configFile: path.resolve(__dirname, './.stylelintrc'),
        context: srcPath,
        failOnError: false,
        quiet: false
      }),
      new WebpackBuildNotifierPlugin({
        title: 'webpack config',
        suppressSuccess: true,
        warningSound: true,
        messageFormatter: error => `${error}`
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: !production && watch ? 'server' : 'disabled'
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'async'
      }
    },
    devServer: {
      contentBase: buildPath,
    }
  }
};
