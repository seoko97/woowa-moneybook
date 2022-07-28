const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");

const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  devtool: "source-map",
  mode: isProduction ? "production" : "development",
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: "shared",
    },
    shared: "lodash",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[fullhash].[name].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.svg$/i,
        loader: "svg-inline-loader",
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: isProduction ? "[name].[ext]?[hash]" : "[name].[ext]",
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new MiniCssExtractPlugin({
      filename: isProduction ? "[fullhash].css" : "[name].css",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  optimization: {
    minimize: isProduction,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    runtimeChunk: "single",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    historyApiFallback: true,
  },
};
