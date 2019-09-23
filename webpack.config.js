const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index.js'),
    admin: path.join(__dirname, 'src', 'admin.js'),
    employee: path.join(__dirname, 'src', 'employee.js'),
    adminReview: path.join(__dirname, 'src', 'adminReview.js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: { name: './static/[name].[ext]' },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
};
