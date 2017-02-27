module.exports = {
  entry: './src/index.js',
  output: {
    path: './',
    filename: 'jumpsuit.js',
    library: 'jumpsuit',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['es2015', {modules: false}],
            'stage-2'
          ]
        }
      }
    ]
  },
  performance: {
    hints: 'warning'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}
