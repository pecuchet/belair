import path from 'path';

export default {
	/**
	 * Function that mutates the original webpack config.
	 * Supports asynchronous changes when a promise is returned (or it's an async function).
	 * @see https://github.com/preactjs/preact-cli#webpack
	 * @param {object} config - original webpack config.
	 * @param {object} env - options passed to the CLI.
	 * @param {object<function>} helpers - object with useful helpers for working with the webpack config.
	 * @param {object} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
	 **/
	webpack(config, env, helpers, options) {
		config.devServer.watchOptions.ignored = [].concat(config.devServer.watchOptions.ignored, [
			path.resolve(__dirname, 'src/cron'),
			path.resolve(__dirname, 'src/server'),
		])
	},
};
