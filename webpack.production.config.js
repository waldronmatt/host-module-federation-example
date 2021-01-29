const path = require("path");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    app: ["./src/bootstrap.js"],
  },
  output: {
    filename: "[name].[contenthash:8].js",
    // specify chunck path for code splitted files
    chunkFilename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "https://host-module-federation-example.netlify.app/",
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        type: "asset/inline",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
  optimization: {
    minimize: true,
    minimizer: [
      // for webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
      "...",
      new CssMinimizerPlugin(),
    ],
    /*
      SplitChunks finds modules which are shared between chunks and splits them
      into separate chunks to reduce duplication or separate vendor modules from application modules.
    */
    splitChunks: {
      /*
        cacheGroups tells SplitChunksPlugin to create chunks based on some conditions
      */
      cacheGroups: {
        // vendor chunk
        vendor: {
          // name of the chunk - make sure name is unqiue to avoid namespace collisions w/ module federation
          name: "vendors-host",
          // Optimization over Async and Sync Module (a default'ish' setting for chuncks)
          chunks: "all",
          // import file path containing node_modules
          test: /node_modules/,
        },
      },
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Host",
      description: "Host App of Module Federation",
      template: "src/template.ejs",
      excludeChunks: ["server"],
    }),
    new ModuleFederationPlugin({
      remotes: {
        FormApp:
          "FormApp@https://remote-module-federation-example.netlify.app/remoteEntry.js",
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
          // singleton: true,
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
