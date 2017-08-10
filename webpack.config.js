'use strict';

const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: './src/control.js',
    output: {
        filename: 'bundle.js'
    },

    // http://webpack.github.io/docs/configuration.html#node
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    // Loader for Retrieve & Rank
    // Retrieve & Rank depends on solr-client, which depends on JSONStream, which starts with a shebang line, which
    // Webpack chokes on - this strips off that line.
    //
    // This isn't strictly needed because Retrieve & Rank doesn't support CORS, so there's no reason to include it in a
    // bundle. However, it's preserved here just to make things easy.
    //
    // See https://github.com/webpack/webpack/issues/2168 for more info
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015', 'stage-0']
                }
            }, {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'), {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }, {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009'
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },

    plugins: [new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: false // load .env.example (defaults to "false" which does not use dotenv-safe)
        })]
};
