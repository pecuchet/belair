const path = require('path');

module.exports = {
	devtool: 'none',
	target: 'node',
	entry: path.resolve(__dirname, 'src/cron/index.js'),
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'build/cron')
	},
	node: false,
};
