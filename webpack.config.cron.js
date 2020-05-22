const
    path = require('path'),
    NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = (env, argv) => {
    const dev = argv.mode === 'development';

    return {
        watch: dev,
        devtool: 'none',
        target: 'node',
        entry: path.resolve(__dirname, 'src/cron/index.js'),
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'build/cron')
        },
        node: false,
        plugins: dev ? [
            new NodemonPlugin(),
        ] : []
    }
};
