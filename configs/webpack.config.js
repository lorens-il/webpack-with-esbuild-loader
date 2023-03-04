// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { EsbuildPlugin } = require('esbuild-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

const config = {
  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
  target: 'browserslist',
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
        use: [
          stylesHandler,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true, // необходимо чтобы обычные классы тоже работали.
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
      {
        test: /\.(jpe?g|png|gif|webp|svg)$/i,
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
        new ImageMinimizerPlugin({
          minimizer: [
            {
              implementation: ImageMinimizerPlugin.sharpMinify,
              options: {
                encodeOptions: {
                  jpeg: {
                  // https://sharp.pixelplumbing.com/api-output#jpeg
                    quality: 75,
                  },
                  webp: {
                  // https://sharp.pixelplumbing.com/api-output#webp
                    lossless: true,
                  },
                  avif: {
                  // https://sharp.pixelplumbing.com/api-output#avif
                    lossless: true,
                  },
                  // png by default sets the quality to 100%, which is same as lossless
                  // https://sharp.pixelplumbing.com/api-output#png
                  png: {},
                  // gif does not support lossless compression at all
                  // https://sharp.pixelplumbing.com/api-output#gif
                  gif: {},
                },
              },
            },
            {
              // `svgo` will handle vector images (SVG)
              implementation: ImageMinimizerPlugin.svgoMinify,
              options: {
                encodeOptions: {
                  // Pass over SVGs multiple times to ensure all optimizations are applied.
                  // False by default
                  multipass: true,
                  plugins: [
                    // set of built-in plugins enabled by default
                    // see: https://github.com/svg/svgo#default-preset
                    'preset-default',
                  ],
                },
              },
            },
          ],
        }),
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
