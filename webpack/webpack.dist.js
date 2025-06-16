const path = require('path');

module.exports = {
  entry: './contextCursor/index.ts',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    library: 'ContextCursor',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
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
