const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { prod_Path, preview_Path } = require("./path");
const { selectedPreprocessor } = require("./loader");

module.exports = {
  entry: {
    main: "./" + preview_Path + "/test.ts",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, prod_Path),
    filename: "[name].[contenthash].js",
  },
  devtool: "source-map",
  devServer: {
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: selectedPreprocessor.fileRegexp,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: false,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: selectedPreprocessor.loaderName,
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      hash: false,
      favicon: "./" + preview_Path + "/assets/favico/ico-64x64.png",
      template: "./" + preview_Path + "/index.html",
      filename: "index.html",
    }),
  ],
};
