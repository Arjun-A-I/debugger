const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src');
const outputDir = path.resolve(__dirname, 'static');

const main = {
  mode: 'development',
  node: {
    fs: 'empty'
  },
  devtool: 'source-map',
  entry: {
    app: path.join(srcDir, 'index.ts'),
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    globalObject: 'self',
    filename: '[name].bundle.js',
    path: outputDir,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'browserless debugger',
      template: path.join(srcDir, 'index.html'),
    }),
  ],
};

const worker = {
  target: 'webworker',
  mode: 'development',
  node: {
    fs: 'empty'
  },
  devtool: 'source-map',
  entry: {
    'puppeteer.worker': path.join(srcDir, 'puppeteer.worker.ts'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    globalObject: 'self',
    filename: '[name].bundle.js',
    path: outputDir,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
};

module.exports = [main, worker];
