const path = require('path')


module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        index: './src/index.js',
        '0700755a-7619-4827-b81a-46ba4bb13ecc': {
            dependOn: 'index',
            import: './src/group1.js'
        },
        '0ce86008-8a91-4c87-9a6c-5fbb9482b43a': {
            dependOn: 'index',
            import: './src/group2.js'
        }
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[id].bundle.js'
    }
}