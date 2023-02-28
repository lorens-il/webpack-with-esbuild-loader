// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EsbuildPlugin } = require('esbuild-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
  output: {
    filename: 'main-[chunkhash:8].js', // '[name].main-[chunkhash].js'
    path: path.resolve(__dirname, '..', 'build'),
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 3000,
  },
  devtool: isProduction ? 'eval' : 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
    }),
    new CleanWebpackPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        // Match js, jsx, ts & tsx files
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          // JavaScript version to compile to
          target: 'es2016',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    alias: {
      '@public': path.resolve(__dirname, '..', 'public'),
      '@': path.resolve(__dirname, '..', 'src'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.optimization = {
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [
        new EsbuildPlugin(
          {
            target: 'es2016', // Syntax to compile to (see options below for possible values)
            minify: true,
            css: true,
          },
        ),
      ],
    };
    config.plugins.push(
      new MiniCssExtractPlugin(
        {
          filename: 'main-css-[chunkhash:8].css',
        },
      ),
    );
  } else {
    config.mode = 'development';
    // ESLintPlugin
    // config.plugins.push(
    // ESLintPlugin очень тормозит сборку, если убрать не будет проверять на ошибки перед сборкой
    // ESLintPlugin нужен только для проверки на ошибки перед сборкой
    // ESLintPlugin не влияет на проверку ошибок во время кодинга
    // new ESLintPlugin({
    //   extensions: ['js', 'jsx', 'ts', 'tsx'],
    //   overrideConfigFile: path.resolve(__dirname, '.eslintrc'),
    // }),
    // );
  }
  return config;
};
