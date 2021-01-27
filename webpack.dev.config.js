const path = require("path");
const chokidar = require("chokidar");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  entry: {
    app: ["./src/bootstrap.js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9001/",
  },
  mode: "development",
  /* 
    hot reloading broken in dev-server, use chokidar instead: 
    https://github.com/webpack/webpack-dev-server/issues/2906
  */
  devServer: {
    before(app, server) {
      chokidar.watch(["./src/**/**"]).on("all", function () {
        server.sockWrite(server.sockets, "content-changed");
      });
    },
    contentBase: path.resolve(__dirname, "./dist"),
    index: "index.html",
    port: 9001,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        type: "asset/inline",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Host",
      description: "Host App of Module Federation",
      template: "src/template.ejs",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      remotes: {
        FormApp: "FormApp@http://localhost:9000/remoteEntry.js",
      },
      /*
        More information on M.F. config settings can be found here:
        https://github.com/webpack/webpack/pull/10960
        https://github.com/webpack/webpack/blob/master/schemas/plugins/container/ModuleFederationPlugin.json
        https://www.angulararchitects.io/en/aktuelles/getting-out-of-version-mismatch-hell-with-module-federation/
      */
      shared: {
        // // use object spread to change single entries
        ...deps,
        jquery: {
          /*
            Include the provided and fallback module directly instead behind an async request.
            This allows to use this shared module in initial load too. All possible shared modules need to be eager too.

            Webpack docs:
            You can make shared modules "eager", which doesn't put the modules in a async chunk, but provides them synchronously. 
            This allows to use these shared modules in the initial chunk. But be careful as all provided and fallback modules 
            will always be downloaded. There it's wise to provide it only at one point of your app, e. g. the shell.
            https://github.com/webpack/webpack/pull/10960
          */
          eager: true,
          // only a single version of the shared module is allowed
          // singleton: false,
          /*
            if true, don't use shared version when version isn't valid.
            Singleton or modules without fallback will throw, otherwise fallback is used

            has no effect if there is no "requiredVersion" specified
          */
          // strictVersion: false,
          /* 
            Version requirement from module in share scope.
            This is the specified version contract between host and remote
          */
          // requiredVersion: `>=1.0.0 <=2.0.0`,
        },
      },
    }),
  ],
};
