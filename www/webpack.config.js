var webpack = require('webpack');

module.exports = {
    context: __dirname ,
    entry: {
        app: './app/app.js'
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
    output: {
        path: __dirname + '/build',
        filename: 'app.bundle.js'
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
    ]
}