var webpack = require('webpack');

module.exports = {
    context: __dirname ,
    entry: {
        app: './app/app.ts'
    /*    vendor: [
            './assets/vendor/kage-engine/2d.js',
            './assets/vendor/kage-engine/buhin.js',
            './assets/vendor/kage-engine/curve.js',
            './assets/vendor/kage-engine/kage.js',
            './assets/vendor/kage-engine/kagecd.js',
            './assets/vendor/kage-engine/kagedf.js',
            './assets/vendor/kage-engine/polygon.js',
            './assets/vendor/kage-engine/polygons.js'
        ]*/
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: __dirname + '/build',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            { test: /\.(t|j)s$/, use: { loader: 'awesome-typescript-loader?{tsconfig: "tsconfig.json"}' } },
            { test: /\.(html)$/, use: { loader: 'html-loader', options: { attrs: false }}},
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
      //  new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js"}),
        new webpack.ProvidePlugin({
            'Kage': 'kage-engine'
        })          
    ],
    devtool: 'source-map'
}