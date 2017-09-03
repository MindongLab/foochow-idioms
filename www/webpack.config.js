var webpack = require('webpack');

module.exports = {
    context: __dirname ,
    entry: {
        app: './app/app.js',
        vendor: [
            'angular', 
            './assets/vendor/kage-engine/*.js'
        ]
    },
    output: {
        path: __dirname + '/build',
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js"})

    ]
}