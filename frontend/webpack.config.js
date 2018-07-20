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
      rules: [
        {
          test: /\.svg$/i,
          use: [
            {
              loader: 'emit-file-loader',
              options: {
                name: 'dist/[path][name].[ext]',
              },
            },
            {
              loader: 'svg-url-loader',
              options: {
                outputPath: 'static/',
                publicPath: '/_next/',
                limit: 1000,
              },
            },
          ]
        }, {
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
        }, {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: 'images/[hash]-[name].[ext]'
            }
          }]
        }]
    },

    plugins: [
      new ExtractCssChunks({
        path: path.join(__dirname, 'dist'),
        filename: 'styles.css',
      })
    ],

    devtool: 'source-map',
    mode: 'development',

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      proxy: {
        '/auth/facebook': 'http://192.168.3.184:3000/login'
      }
    }
  };
};

// babel-loader  is a webpack plugin to teach webpack how to work with certain type of files
// babel-core is much like babel-cli(command line interface),
// which allows us to use babel with webpack . babel-cli allows us to use babel in the command line.
// use allows us to provide array of loaders
// node-sass  allows us to compile scss to css
// style-loader  is used for inlining css styles
// sass-loader  -  Loads a Sass/SCSS file and compiles it to CSS.
/* devServer.historyApiFallback -  When using the HTML5 History API,
the index.html page will likely have to be served in place of any 404 responses.
Enable this by passing: */
// for handling errors in console by more good way . it shows the exact place of error
