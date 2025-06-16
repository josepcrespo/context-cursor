const path = require('path');

const baseConfig = {
  entry: './contextCursor/index.ts',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {},
  mode: 'production'
};

const umdConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.umd.js',
    library: 'ContextCursor',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
};

const esmConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.esm.js',
    library: {
      type: 'module'
    },
    module: true
  },
  experiments: {
    outputModule: true
  }
};

module.exports = [umdConfig, esmConfig];
