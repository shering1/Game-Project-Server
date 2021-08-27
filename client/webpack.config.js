module.exports = {
    entry: [
        './index.js'
    ],
    output: {
        path: __dirname,
        filename: '../public/bundle.js'
    },
    devtool: 'source-map', //may have to put an s here
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-react'
                    ]
                }
            }
        ]
    }

}