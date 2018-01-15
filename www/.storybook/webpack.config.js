var webpack = require('webpack');
const path = require('path')

module.exports = {
    context: __dirname,
    entry: {
        '03app': './app/app.ts',
        '02vendor': './app/vendor.ts',
        '01polyfills': './app/polyfills.ts'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            { test: /\.ts$/, use: { loader: 'awesome-typescript-loader?{tsconfig: "tsconfig.json"}' } },
            { test: /\.(html)$/, use: { loader: 'html-loader', options: { attrs: false } } },
            // addition - add source-map support 
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        'angular': 'angular',
        'jquery': 'jQuery',
        'kage-engine': 'Kage'
    },
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            path.join(__dirname, 'app'), // location of your src
            {} // a map of your routes
        ),
        new webpack.ProvidePlugin({
            'Kage': 'kage-engine'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['03app', '02vendor', '01polyfills']
        }),

    ],
    devtool: 'source-map'
}