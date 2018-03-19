var config = {
   entry: __dirname+'/main.js',

   output: {
      path:__dirname+'/',
      filename: 'index.js',
   },



   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react']
            }
         },
         {
             test: /\.css$/,
            loader: 'style-loader!css-loader'
          }
      ]
   }
}

module.exports = config;
