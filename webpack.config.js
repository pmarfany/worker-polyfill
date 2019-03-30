const path = require("path");
const webpack = require("webpack");

const PATHS = {
  entryPoint: path.resolve(__dirname, 'src/worker-polyfill.ts'),
  bundles: path.resolve(__dirname, 'lib'),
};

const config = {
  // These are the entry point of our library. We tell webpack to use
  // the name we assign later, when creating the bundle. We also use
  // the name to filter the second entry point for applying code
  // minification via UglifyJS
  entry: {
    'worker-polyfill': [PATHS.entryPoint],
    'worker-polyfill.min': [PATHS.entryPoint]
  },
  // The output defines how and where we want the bundles. The special
  // value `[name]` in `filename` tell Webpack to use the name we defined above.
  // We target a UMD and name it MyLib. When including the bundle in the browser
  // it will be accessible at `window.MyLib`
  output: {
    path: PATHS.bundles,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'Worker',
    umdNamedDefine: true
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
    ]
  },

};

module.exports = config;