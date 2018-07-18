const path = require('path'); // getting the path.join method from node
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'dist'), // __dirname - returns the absolute path
      filename: 'bundle.js'
    },

    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/, // ? - make 's' optional
        use: [{
          loader: ExtractCssChunks.loader // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: { sourceMap: true }
        }, {
          loader: 'sass-loader', // compiles Less to CSS
          options: { sourceMap: true }
        }]
      }]
    },

    plugins: [
      new ExtractCssChunks({
        path: path.join(__dirname, 'dist'),
        filename: 'styles.css',
      })
    ],

    devtool: 'source-map', // for handling errors in console by more good way . it shows the exact place of error
    mode: 'development',

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true
      // proxy: {
      //     '/api': 'http://localhost:3000'
      //   }
    }
  };
};

/**
 babel-loader  is a webpack plugin to teach webpack how to work with certain type of files
 babel-core is much like babel-cli(command line interface),
 which allows us to use babel with webpack . babel-cli allows us to use babel in the command line.
 use allows us to provide array of loaders
 zode-sass  allows us to compile scss to css
style-loader  is used for inlining css styles
sass-loader  -  Loads a Sass/SCSS file and compiles it to CSS.
devServer.historyApiFallback - When using the HTML5 History API, the index.html page
 will likely have to be served in place of any 404 responses. Enable this by passing:
 */


// use: CSSExtract.extract({
//     use: [
//         {
//             loader: 'css-loader',
//             options: {sourceMap: true}
//         }, {
//             loader:'sass-loader',
//             options: {sourceMap: true}
//         }
//     ]
// })
