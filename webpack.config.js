const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const fileName = ext => {
  return isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
}

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        replaceAll: true,
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
      },
    }
  ]
  if (extra) {
    loaders.push(extra);
  }
  return loaders
}

const jsLoaders = loaders => {
  const use = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: [
        '@babel/plugin-proposal-class-properties'
      ]
    }
  }]
  if (isDev) {
    use.push(loaders);
  }

  return use;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: fileName('js'),
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 3000,
    hot: isDev,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    }
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: fileName('css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders({
          loader: 'sass-loader',
          options: {
            sourceMap: isDev,
          },
        }),

      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders('eslint-loader'),
      }
    ],
  },
}
