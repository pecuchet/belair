/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/cron/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cron/lib/cron.js":
/*!***************************************!*\
  !*** ./node_modules/cron/lib/cron.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! luxon */ "./node_modules/luxon/src/luxon.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
})(this, function(luxon, childProcess) {
	var exports = {};
	var timeUnits = [
		'second',
		'minute',
		'hour',
		'dayOfMonth',
		'month',
		'dayOfWeek'
	];
	var spawn = childProcess && childProcess.spawn;

	function CronTime(source, zone, utcOffset) {
		this.source = source;

		if (zone) {
			const dt = luxon.DateTime.fromObject({ zone: zone });
			if (dt.invalid) {
				throw new Error('Invalid timezone.');
			}

			this.zone = zone;
		}

		if (typeof utcOffset !== 'undefined') this.utcOffset = utcOffset;

		var that = this;
		timeUnits.map(function(timeUnit) {
			that[timeUnit] = {};
		});

		if (this.source instanceof Date || this.source instanceof luxon.DateTime) {
			if (this.source instanceof Date) {
				this.source = luxon.DateTime.fromJSDate(this.source);
			}
			this.realDate = true;
		} else {
			this._parse();
			this._verifyParse();
		}
	}

	CronTime.constraints = [[0, 59], [0, 59], [0, 23], [1, 31], [0, 11], [0, 6]];
	CronTime.monthConstraints = [
		31,
		29, // support leap year...not perfect
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31
	];
	CronTime.parseDefaults = ['0', '*', '*', '*', '*', '*'];
	CronTime.aliases = {
		jan: 0,
		feb: 1,
		mar: 2,
		apr: 3,
		may: 4,
		jun: 5,
		jul: 6,
		aug: 7,
		sep: 8,
		oct: 9,
		nov: 10,
		dec: 11,
		sun: 0,
		mon: 1,
		tue: 2,
		wed: 3,
		thu: 4,
		fri: 5,
		sat: 6
	};

	CronTime.prototype = {
		_verifyParse: function() {
			var months = Object.keys(this.month);
			var ok = false;

			/* if a dayOfMonth is not found in all months, we only need to fix the last
			 wrong month  to prevent infinite loop */
			var lastWrongMonth = NaN;
			for (var i = 0; i < months.length; i++) {
				var m = months[i];
				var con = CronTime.monthConstraints[parseInt(m, 10)];
				var dsom = Object.keys(this.dayOfMonth);

				for (var j = 0; j < dsom.length; j++) {
					var dom = dsom[j];
					if (dom <= con) {
						ok = true;
					}
				}

				if (!ok) {
					// save the month in order to be fixed if all months fails (infinite loop)
					lastWrongMonth = m;
					console.warn("Month '" + m + "' is limited to '" + con + "' days.");
				}
			}

			// infinite loop detected (dayOfMonth is not found in all months)
			if (!ok) {
				var con = CronTime.monthConstraints[parseInt(lastWrongMonth, 10)];
				var dsom = Object.keys(this.dayOfMonth);
				for (var k = 0; k < dsom.length; k++) {
					var dom = dsom[k];
					if (dom > con) {
						delete this.dayOfMonth[dom];
						var fixedDay = Number(dom) % con;
						this.dayOfMonth[fixedDay] = true;
					}
				}
			}
		},

		/**
		 * calculates the next send time
		 */
		sendAt: function(i) {
			var date = this.realDate ? this.source : luxon.DateTime.local();
			if (this.zone) {
				date = date.setZone(this.zone);
			}

			if (typeof this.utcOffset !== 'undefined') {
				let offset =
					this.utcOffset >= 60 || this.utcOffset <= -60
						? this.utcOffset / 60
						: this.utcOffset;
				offset = parseInt(offset);
				let utcZone = 'UTC';
				if (offset < 0) {
					utcZone += offset;
				} else if (offset > 0) {
					utcZone += '+' + offset;
				}
				date = date.setZone(utcZone);
				if (date.invalid) {
					throw new Error('ERROR: You specified an invalid UTC offset.');
				}
			}

			if (this.realDate) {
				if (luxon.DateTime.local() > date) {
					throw new Error('WARNING: Date in past. Will never be fired.');
				}

				return date;
			}

			// If the i argument is not given, return the next send time
			if (isNaN(i) || i < 0) {
				date = this._getNextDateFrom(date);

				return date;
			} else {
				// Else return the next i send times
				var dates = [];
				for (; i > 0; i--) {
					date = this._getNextDateFrom(date);
					dates.push(date);
				}

				return dates;
			}
		},

		/**
		 * Get the number of milliseconds in the future at which to fire our callbacks.
		 */
		getTimeout: function() {
			return Math.max(-1, this.sendAt() - luxon.DateTime.local());
		},

		/**
		 * writes out a cron string
		 */
		toString: function() {
			return this.toJSON().join(' ');
		},

		/**
		 * Json representation of the parsed cron syntax.
		 */
		toJSON: function() {
			var self = this;
			return timeUnits.map(function(timeName) {
				return self._wcOrAll(timeName);
			});
		},

		/**
		 * get next date that matches parsed cron time
		 */
		_getNextDateFrom: function(start, zone) {
			if (start instanceof Date) {
				start = luxon.DateTime.fromJSDate(start);
			}
			var date = start;
			var firstDate = start.toMillis();
			if (zone) {
				date = date.setZone(zone);
			}
			if (!this.realDate) {
				if (date.millisecond > 0) {
					date = date.set({ millisecond: 0, second: date.second + 1 });
				}
			}

			if (date.invalid) {
				throw new Error('ERROR: You specified an invalid date.');
			}

			// it shouldn't take more than 5 seconds to find the next execution time
			// being very generous with this. Throw error if it takes too long to find the next time to protect from
			// infinite loop.
			var timeout = Date.now() + 5000;
			// determine next date
			while (true) {
				var diff = date - start
				if (Date.now() > timeout) {
					throw new Error(
						`Something went wrong. cron reached maximum iterations.
						Please open an  issue (https://github.com/kelektiv/node-cron/issues/new) and provide the following string
						Time Zone: ${zone || '""'} - Cron String: ${this} - UTC offset: ${date.format(
							'Z'
						)} - current Date: ${luxon.DateTime.local().toString()}`
					);
				}
				if (
					!(date.month - 1 in this.month) &&
					Object.keys(this.month).length !== 12
				) {
					date = date.plus({ months: 1 });
					date = date.set({ day: 1, hour: 0, minute: 0, second: 0 });
					continue;
				}

				if (
					!(date.day in this.dayOfMonth) &&
					Object.keys(this.dayOfMonth).length !== 31 &&
					!(
						date.getWeekDay() in this.dayOfWeek &&
						Object.keys(this.dayOfWeek).length !== 7
					)
				) {
					date = date.plus({ days: 1 });
					date = date.set({ hour: 0, minute: 0, second: 0 });
					continue;
				}

				if (
					!(date.getWeekDay() in this.dayOfWeek) &&
					Object.keys(this.dayOfWeek).length !== 7 &&
					!(
						date.day in this.dayOfMonth &&
						Object.keys(this.dayOfMonth).length !== 31
					)
				) {
					date = date.plus({ days: 1 });
					date = date.set({ hour: 0, minute: 0, second: 0 });
					continue;
				}

				if (!(date.hour in this.hour) && Object.keys(this.hour).length !== 24) {
					date = date.set({
						hour: date.hour === 23 && diff > 86400000 ? 0 : date.hour + 1
					});
					date = date.set({ minute: 0, second: 0 });
					continue;
				}

				if (
					!(date.minute in this.minute) &&
					Object.keys(this.minute).length !== 60
				) {
					date = date.set({
						minute:
							date.minute === 59 && diff > 60 * 60 * 1000
								? 0
								: date.minute + 1
					});
					date = date.set({ second: 0 });
					continue;
				}

				if (
					!(date.second in this.second) &&
					Object.keys(this.second).length !== 60
				) {
					date = date.set({
						second: date.second === 59 && diff > 60 * 1000 ? 0 : date.second + 1
					});
					continue;
				}

				if (date.toMillis() === firstDate) {
					date = date.set({ second: date.second + 1 });
					continue;
				}

				break;
			}

			return date;
		},

		/**
		 * wildcard, or all params in array (for to string)
		 */
		_wcOrAll: function(type) {
			if (this._hasAll(type)) return '*';

			var all = [];
			for (var time in this[type]) {
				all.push(time);
			}

			return all.join(',');
		},

		_hasAll: function(type) {
			var constrain = CronTime.constraints[timeUnits.indexOf(type)];

			for (var i = constrain[0], n = constrain[1]; i < n; i++) {
				if (!(i in this[type])) return false;
			}

			return true;
		},

		_parse: function() {
			var aliases = CronTime.aliases;
			var source = this.source.replace(/[a-z]{1,3}/gi, function(alias) {
				alias = alias.toLowerCase();

				if (alias in aliases) {
					return aliases[alias];
				}

				throw new Error('Unknown alias: ' + alias);
			});
			var split = source.replace(/^\s\s*|\s\s*$/g, '').split(/\s+/);
			var cur;
			var i = 0;
			var len = timeUnits.length;

			// seconds are optional
			if (split.length < timeUnits.length - 1) {
				throw new Error('Too few fields');
			}
			if (split.length > timeUnits.length) {
				throw new Error('Too many fields');
			}

			for (; i < timeUnits.length; i++) {
				// If the split source string doesn't contain all digits,
				// assume defaults for first n missing digits.
				// This adds support for 5-digit standard cron syntax
				cur = split[i - (len - split.length)] || CronTime.parseDefaults[i];
				this._parseField(cur, timeUnits[i], CronTime.constraints[i]);
			}
		},

		_parseField: function(field, type, constraints) {
			var rangePattern = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g;
			var typeObj = this[type];
			var pointer;
			var low = constraints[0];
			var high = constraints[1];

			var fields = field.split(',');
			fields.forEach(function(field) {
				var wildcardIndex = field.indexOf('*');
				if (wildcardIndex !== -1 && wildcardIndex !== 0) {
					throw new Error('Field (' + field + ') has an invalid wildcard expression');
				}
			});

			// * is a shortcut to [lower-upper] range
			field = field.replace(/\*/g, low + '-' + high);

			// commas separate information, so split based on those
			var allRanges = field.split(',');

			for (var i = 0; i < allRanges.length; i++) {
				if (allRanges[i].match(rangePattern)) {
					allRanges[i].replace(rangePattern, function($0, lower, upper, step) {
						lower = parseInt(lower, 10);
						upper = parseInt(upper, 10) || undefined;

						const wasStepDefined = !isNaN(parseInt(step, 10));
						if (step === '0') {
							throw new Error('Field (' + field + ') has a step of zero');
						}
						step = parseInt(step, 10) || 1;

						if (upper && lower > upper) {
							throw new Error('Field (' + field + ') has an invalid range');
						}

						const outOfRangeError =
							lower < low ||
							(upper && upper > high) ||
							(!upper && lower > high);

						if (outOfRangeError) {
							throw new Error('Field (' + field + ') value is out of range');
						}

						// Positive integer higher than constraints[0]
						lower = Math.min(Math.max(low, ~~Math.abs(lower)), high);

						// Positive integer lower than constraints[1]
						if (upper) {
							upper = Math.min(high, ~~Math.abs(upper));
						} else {
							// If step is provided, the default upper range is the highest value
							upper = wasStepDefined ? high : lower;
						}

						// Count from the lower barrier to the upper
						pointer = lower;

						do {
							typeObj[pointer] = true;
							pointer += step;
						} while (pointer <= upper);
					});
				} else {
					throw new Error('Field (' + field + ') cannot be parsed');
				}
			}
		}
	};

	function command2function(cmd) {
		var command;
		var args;

		switch (typeof cmd) {
			case 'string':
				args = cmd.split(' ');
				command = args.shift();

				cmd = spawn.bind(undefined, command, args);
				break;

			case 'object':
				command = cmd && cmd.command;
				if (command) {
					args = cmd.args;
					var options = cmd.options;

					cmd = spawn.bind(undefined, command, args, options);
				}
				break;
		}

		return cmd;
	}

	function CronJob(
		cronTime,
		onTick,
		onComplete,
		startNow,
		timeZone,
		context,
		runOnInit,
		utcOffset,
		unrefTimeout
	) {
		var _cronTime = cronTime;
		var argCount = 0;
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i] !== undefined) {
				argCount++;
			}
		}
		if (typeof cronTime !== 'string' && argCount === 1) {
			// crontime is an object...
			onTick = cronTime.onTick;
			onComplete = cronTime.onComplete;
			context = cronTime.context;
			startNow = cronTime.start || cronTime.startNow || cronTime.startJob;
			timeZone = cronTime.timeZone;
			runOnInit = cronTime.runOnInit;
			_cronTime = cronTime.cronTime;
			utcOffset = cronTime.utcOffset;
			unrefTimeout = cronTime.unrefTimeout;
		}

		this.context = context || this;
		this._callbacks = [];
		this.onComplete = command2function(onComplete);
		this.cronTime = new CronTime(_cronTime, timeZone, utcOffset);
		this.unrefTimeout = unrefTimeout;

		addCallback.call(this, command2function(onTick));

		if (runOnInit) {
			this.lastExecution = new Date();
			fireOnTick.call(this);
		}

		if (startNow) {
			start.call(this);
		}

		return this;
	}

	var addCallback = function(callback) {
		if (typeof callback === 'function') this._callbacks.push(callback);
	};
	CronJob.prototype.addCallback = addCallback;

	CronJob.prototype.setTime = function(time) {
		if (typeof time !== 'object') // crontime is an object...
			throw new Error('time must be an instance of CronTime.');
		this.stop();
		this.cronTime = time;
		this.start();
	};

	CronJob.prototype.nextDate = function() {
		return this.cronTime.sendAt();
	};

	var fireOnTick = function() {
		for (var i = this._callbacks.length - 1; i >= 0; i--)
			this._callbacks[i].call(this.context, this.onComplete);
	};
	CronJob.prototype.fireOnTick = fireOnTick;

	CronJob.prototype.nextDates = function(i) {
		return this.cronTime.sendAt(i);
	};

	var start = function() {
		if (this.running) return;

		var MAXDELAY = 2147483647; // The maximum number of milliseconds setTimeout will wait.
		var self = this;
		var timeout = this.cronTime.getTimeout();
		var remaining = 0;
		var startTime;

		if (this.cronTime.realDate) this.runOnce = true;

		function _setTimeout(timeout) {
			startTime = Date.now();
			self._timeout = setTimeout(callbackWrapper, timeout);
			if (self.unrefTimeout && typeof self._timeout.unref === 'function') {
				self._timeout.unref();
			}
		}

		// The callback wrapper checks if it needs to sleep another period or not
		// and does the real callback logic when it's time.

		function callbackWrapper() {
			var diff = startTime + timeout - Date.now();

			if (diff > 0) {
				var newTimeout = self.cronTime.getTimeout();

				if (newTimeout > diff) {
					newTimeout = diff;
				}

				remaining += newTimeout;
			}

			// If there is sleep time remaining, calculate how long and go to sleep
			// again. This processing might make us miss the deadline by a few ms
			// times the number of sleep sessions. Given a MAXDELAY of almost a
			// month, this should be no issue.

			self.lastExecution = new Date();
			if (remaining) {
				if (remaining > MAXDELAY) {
					remaining -= MAXDELAY;
					timeout = MAXDELAY;
				} else {
					timeout = remaining;
					remaining = 0;
				}

				_setTimeout(timeout);
			} else {
				// We have arrived at the correct point in time.

				self.running = false;

				// start before calling back so the callbacks have the ability to stop the cron job
				if (!self.runOnce) self.start();

				self.fireOnTick();
			}
		}

		if (timeout >= 0) {
			this.running = true;

			// Don't try to sleep more than MAXDELAY ms at a time.

			if (timeout > MAXDELAY) {
				remaining = timeout - MAXDELAY;
				timeout = MAXDELAY;
			}

			_setTimeout(timeout);
		} else {
			this.stop();
		}
	};

	CronJob.prototype.start = start;

	CronJob.prototype.lastDate = function() {
		return this.lastExecution;
	};

	/**
	 * Stop the cronjob.
	 */
	CronJob.prototype.stop = function() {
		if (this._timeout) clearTimeout(this._timeout);
		this.running = false;
		if (typeof this.onComplete === 'function') this.onComplete();
	};

	/**
	 * Extend Luxon DateTime
	 */
	luxon.DateTime.prototype.getWeekDay = function() {
		return this.weekday === 7 ? 0 : this.weekday;
	};

	exports.job = function(
		cronTime,
		onTick,
		onComplete,
		startNow,
		timeZone,
		context,
		runOnInit,
		utcOffset,
		unrefTimeout
	) {
		return new CronJob(
			cronTime,
			onTick,
			onComplete,
			startNow,
			timeZone,
			context,
			runOnInit,
			utcOffset,
			unrefTimeout
		);
	};

	exports.time = function(cronTime, timeZone) {
		return new CronTime(cronTime, timeZone);
	};

	exports.sendAt = function(cronTime) {
		return exports.time(cronTime).sendAt();
	};

	exports.timeout = function(cronTime) {
		return exports.time(cronTime).getTimeout();
	};

	exports.CronJob = CronJob;
	exports.CronTime = CronTime;

	return exports;
});


/***/ }),

/***/ "./node_modules/luxon/src/datetime.js":
/*!********************************************!*\
  !*** ./node_modules/luxon/src/datetime.js ***!
  \********************************************/
/*! exports provided: default, friendlyDateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "friendlyDateTime", function() { return friendlyDateTime; });
/* harmony import */ var _duration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./duration.js */ "./node_modules/luxon/src/duration.js");
/* harmony import */ var _interval_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interval.js */ "./node_modules/luxon/src/interval.js");
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings.js */ "./node_modules/luxon/src/settings.js");
/* harmony import */ var _info_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./info.js */ "./node_modules/luxon/src/info.js");
/* harmony import */ var _impl_formatter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./impl/formatter.js */ "./node_modules/luxon/src/impl/formatter.js");
/* harmony import */ var _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./zones/fixedOffsetZone.js */ "./node_modules/luxon/src/zones/fixedOffsetZone.js");
/* harmony import */ var _impl_locale_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./impl/locale.js */ "./node_modules/luxon/src/impl/locale.js");
/* harmony import */ var _impl_util_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./impl/util.js */ "./node_modules/luxon/src/impl/util.js");
/* harmony import */ var _impl_zoneUtil_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./impl/zoneUtil.js */ "./node_modules/luxon/src/impl/zoneUtil.js");
/* harmony import */ var _impl_diff_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./impl/diff.js */ "./node_modules/luxon/src/impl/diff.js");
/* harmony import */ var _impl_regexParser_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./impl/regexParser.js */ "./node_modules/luxon/src/impl/regexParser.js");
/* harmony import */ var _impl_tokenParser_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./impl/tokenParser.js */ "./node_modules/luxon/src/impl/tokenParser.js");
/* harmony import */ var _impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./impl/conversions.js */ "./node_modules/luxon/src/impl/conversions.js");
/* harmony import */ var _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./impl/formats.js */ "./node_modules/luxon/src/impl/formats.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./errors.js */ "./node_modules/luxon/src/errors.js");
/* harmony import */ var _impl_invalid_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./impl/invalid.js */ "./node_modules/luxon/src/impl/invalid.js");

















const INVALID = "Invalid DateTime";
const MAX_DATE = 8.64e15;

function unsupportedZone(zone) {
  return new _impl_invalid_js__WEBPACK_IMPORTED_MODULE_15__["default"]("unsupported zone", `the zone "${zone.name}" is not supported`);
}

// we cache week data on the DT object and this intermediates the cache
function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["gregorianToWeek"])(dt.c);
  }
  return dt.weekData;
}

// clone really means, "make a new object with these modifications". all "setters" really use this
// to create a new object while only changing some of the properties
function clone(inst, alts) {
  const current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalid: inst.invalid
  };
  return new DateTime(Object.assign({}, current, alts, { old: current }));
}

// find the right offset a given local time. The o input is our guess, which determines which
// offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
function fixOffset(localTS, o, tz) {
  // Our UTC time is just a guess because our offset is just a guess
  let utcGuess = localTS - o * 60 * 1000;

  // Test whether the zone matches the offset for this ts
  const o2 = tz.offset(utcGuess);

  // If so, offset didn't change and we're done
  if (o === o2) {
    return [utcGuess, o];
  }

  // If not, change the ts by the difference in the offset
  utcGuess -= (o2 - o) * 60 * 1000;

  // If that gives us the local time we want, we're done
  const o3 = tz.offset(utcGuess);
  if (o2 === o3) {
    return [utcGuess, o2];
  }

  // If it's different, we're in a hole time. The offset has changed, but the we don't adjust the time
  return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
}

// convert an epoch timestamp into a calendar object with the given offset
function tsToObj(ts, offset) {
  ts += offset * 60 * 1000;

  const d = new Date(ts);

  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
    millisecond: d.getUTCMilliseconds()
  };
}

// convert a calendar object to a epoch timestamp
function objToTS(obj, offset, zone) {
  return fixOffset(Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["objToLocalTS"])(obj), offset, zone);
}

// create a new DT instance by adding a duration, adjusting for DSTs
function adjustTime(inst, dur) {
  const keys = Object.keys(dur.values);
  if (keys.indexOf("milliseconds") === -1) {
    keys.push("milliseconds");
  }

  dur = dur.shiftTo(...keys);

  const oPre = inst.o,
    year = inst.c.year + dur.years,
    month = inst.c.month + dur.months + dur.quarters * 3,
    c = Object.assign({}, inst.c, {
      year,
      month,
      day: Math.min(inst.c.day, Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["daysInMonth"])(year, month)) + dur.days + dur.weeks * 7
    }),
    millisToAdd = _duration_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromObject({
      hours: dur.hours,
      minutes: dur.minutes,
      seconds: dur.seconds,
      milliseconds: dur.milliseconds
    }).as("milliseconds"),
    localTS = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["objToLocalTS"])(c);

  let [ts, o] = fixOffset(localTS, oPre, inst.zone);

  if (millisToAdd !== 0) {
    ts += millisToAdd;
    // that could have changed the offset by going over a DST, but we want to keep the ts the same
    o = inst.zone.offset(ts);
  }

  return { ts, o };
}

// helper useful in turning the results of parsing into real dates
// by handling the zone options
function parseDataToDateTime(parsed, parsedZone, opts, format, text) {
  const { setZone, zone } = opts;
  if (parsed && Object.keys(parsed).length !== 0) {
    const interpretationZone = parsedZone || zone,
      inst = DateTime.fromObject(
        Object.assign(parsed, opts, {
          zone: interpretationZone,
          // setZone is a valid option in the calling methods, but not in fromObject
          setZone: undefined
        })
      );
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(
      new _impl_invalid_js__WEBPACK_IMPORTED_MODULE_15__["default"]("unparsable", `the input "${text}" can't be parsed as ${format}`)
    );
  }
}

// if you want to output a technical format (e.g. RFC 2822), this helper
// helps handle the details
function toTechFormat(dt, format, allowZ = true) {
  return dt.isValid
    ? _impl_formatter_js__WEBPACK_IMPORTED_MODULE_4__["default"].create(_impl_locale_js__WEBPACK_IMPORTED_MODULE_6__["default"].create("en-US"), {
        allowZ,
        forceSimple: true
      }).formatDateTimeFromString(dt, format)
    : null;
}

// technical time formats (e.g. the time part of ISO 8601), take some options
// and this commonizes their handling
function toTechTimeFormat(
  dt,
  {
    suppressSeconds = false,
    suppressMilliseconds = false,
    includeOffset,
    includeZone = false,
    spaceZone = false,
    format = "extended"
  }
) {
  let fmt = format === "basic" ? "HHmm" : "HH:mm";

  if (!suppressSeconds || dt.second !== 0 || dt.millisecond !== 0) {
    fmt += format === "basic" ? "ss" : ":ss";
    if (!suppressMilliseconds || dt.millisecond !== 0) {
      fmt += ".SSS";
    }
  }

  if ((includeZone || includeOffset) && spaceZone) {
    fmt += " ";
  }

  if (includeZone) {
    fmt += "z";
  } else if (includeOffset) {
    fmt += format === "basic" ? "ZZZ" : "ZZ";
  }

  return toTechFormat(dt, fmt);
}

// defaults for unspecified units in the supported calendars
const defaultUnitValues = {
    month: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  },
  defaultWeekUnitValues = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  },
  defaultOrdinalUnitValues = {
    ordinal: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  };

// Units in the supported calendars, sorted by bigness
const orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
  orderedWeekUnits = [
    "weekYear",
    "weekNumber",
    "weekday",
    "hour",
    "minute",
    "second",
    "millisecond"
  ],
  orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];

// standardize case and plurality in units
function normalizeUnit(unit) {
  const normalized = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[unit.toLowerCase()];

  if (!normalized) throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["InvalidUnitError"](unit);

  return normalized;
}

// this is a dumbed down version of fromObject() that runs about 60% faster
// but doesn't do any validation, makes a bunch of assumptions about what units
// are present, and so on.
function quickDT(obj, zone) {
  // assume we have the higher-order units
  for (const u of orderedUnits) {
    if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(obj[u])) {
      obj[u] = defaultUnitValues[u];
    }
  }

  const invalid = Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["hasInvalidGregorianData"])(obj) || Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["hasInvalidTimeData"])(obj);
  if (invalid) {
    return DateTime.invalid(invalid);
  }

  const tsNow = _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].now(),
    offsetProvis = zone.offset(tsNow),
    [ts, o] = objToTS(obj, offsetProvis, zone);

  return new DateTime({
    ts,
    zone,
    o
  });
}

function diffRelative(start, end, opts) {
  const round = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(opts.round) ? true : opts.round,
    format = (c, unit) => {
      c = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["roundTo"])(c, round || opts.calendary ? 0 : 2, true);
      const formatter = end.loc.clone(opts).relFormatter(opts);
      return formatter.format(c, unit);
    },
    differ = unit => {
      if (opts.calendary) {
        if (!end.hasSame(start, unit)) {
          return end
            .startOf(unit)
            .diff(start.startOf(unit), unit)
            .get(unit);
        } else return 0;
      } else {
        return end.diff(start, unit).get(unit);
      }
    };

  if (opts.unit) {
    return format(differ(opts.unit), opts.unit);
  }

  for (const unit of opts.units) {
    const count = differ(unit);
    if (Math.abs(count) >= 1) {
      return format(count, unit);
    }
  }
  return format(0, opts.units[opts.units.length - 1]);
}

/**
 * A DateTime is an immutable data structure representing a specific date and time and accompanying methods. It contains class and instance methods for creating, parsing, interrogating, transforming, and formatting them.
 *
 * A DateTime comprises of:
 * * A timestamp. Each DateTime instance refers to a specific millisecond of the Unix epoch.
 * * A time zone. Each instance is considered in the context of a specific zone (by default the local system's zone).
 * * Configuration properties that effect how output strings are formatted, such as `locale`, `numberingSystem`, and `outputCalendar`.
 *
 * Here is a brief overview of the most commonly used functionality it provides:
 *
 * * **Creation**: To create a DateTime from its components, use one of its factory class methods: {@link local}, {@link utc}, and (most flexibly) {@link fromObject}. To create one from a standard string format, use {@link fromISO}, {@link fromHTTP}, and {@link fromRFC2822}. To create one from a custom string format, use {@link fromFormat}. To create one from a native JS date, use {@link fromJSDate}.
 * * **Gregorian calendar and time**: To examine the Gregorian properties of a DateTime individually (i.e as opposed to collectively through {@link toObject}), use the {@link year}, {@link month},
 * {@link day}, {@link hour}, {@link minute}, {@link second}, {@link millisecond} accessors.
 * * **Week calendar**: For ISO week calendar attributes, see the {@link weekYear}, {@link weekNumber}, and {@link weekday} accessors.
 * * **Configuration** See the {@link locale} and {@link numberingSystem} accessors.
 * * **Transformation**: To transform the DateTime into other DateTimes, use {@link set}, {@link reconfigure}, {@link setZone}, {@link setLocale}, {@link plus}, {@link minus}, {@link endOf}, {@link startOf}, {@link toUTC}, and {@link toLocal}.
 * * **Output**: To convert the DateTime to other representations, use the {@link toRelative}, {@link toRelativeCalendar}, {@link toJSON}, {@link toISO}, {@link toHTTP}, {@link toObject}, {@link toRFC2822}, {@link toString}, {@link toLocaleString}, {@link toFormat}, {@link toMillis} and {@link toJSDate}.
 *
 * There's plenty others documented below. In addition, for more information on subtler topics like internationalization, time zones, alternative calendars, validity, and so on, see the external documentation.
 */
class DateTime {
  /**
   * @access private
   */
  constructor(config) {
    const zone = config.zone || _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultZone;

    let invalid =
      config.invalid ||
      (Number.isNaN(config.ts) ? new _impl_invalid_js__WEBPACK_IMPORTED_MODULE_15__["default"]("invalid input") : null) ||
      (!zone.isValid ? unsupportedZone(zone) : null);
    /**
     * @access private
     */
    this.ts = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(config.ts) ? _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].now() : config.ts;

    let c = null,
      o = null;
    if (!invalid) {
      const unchanged = config.old && config.old.ts === this.ts && config.old.zone.equals(zone);

      if (unchanged) {
        [c, o] = [config.old.c, config.old.o];
      } else {
        const ot = zone.offset(this.ts);
        c = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c.year) ? new _impl_invalid_js__WEBPACK_IMPORTED_MODULE_15__["default"]("invalid input") : null;
        c = invalid ? null : c;
        o = invalid ? null : ot;
      }
    }

    /**
     * @access private
     */
    this._zone = zone;
    /**
     * @access private
     */
    this.loc = config.loc || _impl_locale_js__WEBPACK_IMPORTED_MODULE_6__["default"].create();
    /**
     * @access private
     */
    this.invalid = invalid;
    /**
     * @access private
     */
    this.weekData = null;
    /**
     * @access private
     */
    this.c = c;
    /**
     * @access private
     */
    this.o = o;
    /**
     * @access private
     */
    this.isLuxonDateTime = true;
  }

  // CONSTRUCT

  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                            //~> now
   * @example DateTime.local(2017)                        //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                     //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12)                 //~> 2017-03-12T00:00:00
   * @example DateTime.local(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local(year, month, day, hour, minute, second, millisecond) {
    if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(year)) {
      return new DateTime({ ts: _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].now() });
    } else {
      return quickDT(
        {
          year,
          month,
          day,
          hour,
          minute,
          second,
          millisecond
        },
        _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultZone
      );
    }
  }

  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.utc()                            //~> now
   * @example DateTime.utc(2017)                        //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                     //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                 //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)              //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)          //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)      //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765) //~> 2017-03-12T05:45:10.765Z
   * @return {DateTime}
   */
  static utc(year, month, day, hour, minute, second, millisecond) {
    if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(year)) {
      return new DateTime({
        ts: _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].now(),
        zone: _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_5__["default"].utcInstance
      });
    } else {
      return quickDT(
        {
          year,
          month,
          day,
          hour,
          minute,
          second,
          millisecond
        },
        _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_5__["default"].utcInstance
      );
    }
  }

  /**
   * Create a DateTime from a Javascript Date object. Uses the default zone.
   * @param {Date} date - a Javascript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(date, options = {}) {
    const ts = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isDate"])(date) ? date.valueOf() : NaN;
    if (Number.isNaN(ts)) {
      return DateTime.invalid("invalid input");
    }

    const zoneToUse = Object(_impl_zoneUtil_js__WEBPACK_IMPORTED_MODULE_8__["normalizeZone"])(options.zone, _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }

    return new DateTime({
      ts: ts,
      zone: zoneToUse,
      loc: _impl_locale_js__WEBPACK_IMPORTED_MODULE_6__["default"].fromObject(options)
    });
  }

  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(milliseconds, options = {}) {
    if (!Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isNumber"])(milliseconds)) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["InvalidArgumentError"](
        `fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`
      );
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      // this isn't perfect because because we can still end up out of range because of additional shifting, but it's a start
      return DateTime.invalid("Timestamp out of range");
    } else {
      return new DateTime({
        ts: milliseconds,
        zone: Object(_impl_zoneUtil_js__WEBPACK_IMPORTED_MODULE_8__["normalizeZone"])(options.zone, _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultZone),
        loc: _impl_locale_js__WEBPACK_IMPORTED_MODULE_6__["default"].fromObject(options)
      });
    }
  }

  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(seconds, options = {}) {
    if (!Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isNumber"])(seconds)) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["InvalidArgumentError"]("fromSeconds requires a numerical input");
    } else {
      return new DateTime({
        ts: seconds * 1000,
        zone: Object(_impl_zoneUtil_js__WEBPACK_IMPORTED_MODULE_8__["normalizeZone"])(options.zone, _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultZone),
        loc: _impl_locale_js__WEBPACK_IMPORTED_MODULE_6__["default"].fromObject(options)
      });
    }
  }

  /**
   * Create a DateTime from a Javascript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {string|Zone} [obj.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [obj.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} obj.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} obj.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6, zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @return {DateTime}
   */
  static fromObject(obj) {
    const zoneToUse = Object(_impl_zoneUtil_js__WEBPACK_IMPORTED_MODULE_8__["normalizeZone"])(obj.zone, _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }

    const tsNow = _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].now(),
      offsetProvis = zoneToUse.offset(tsNow),
      normalized = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["normalizeObject"])(obj, normalizeUnit, [
        "zone",
        "locale",
        "outputCalendar",
        "numberingSystem"
      ]),
      containsOrdinal = !Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(normalized.ordinal),
      containsGregorYear = !Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(normalized.year),
      containsGregorMD = !Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(normalized.month) || !Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(normalized.day),
      containsGregor = containsGregorYear || containsGregorMD,
      definiteWeekDef = normalized.weekYear || normalized.weekNumber,
      loc = _impl_locale_js__WEBPACK_IMPORTED_MODULE_6__["default"].fromObject(obj);

    // cases:
    // just a weekday -> this week's instance of that weekday, no worries
    // (gregorian data or ordinal) + (weekYear or weekNumber) -> error
    // (gregorian month or day) + ordinal -> error
    // otherwise just use weeks or ordinals or gregorian, depending on what's specified

    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["ConflictingSpecificationError"](
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    }

    if (containsGregorMD && containsOrdinal) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["ConflictingSpecificationError"]("Can't mix ordinal dates with month/day");
    }

    const useWeekData = definiteWeekDef || (normalized.weekday && !containsGregor);

    // configure ourselves to deal with gregorian dates or week stuff
    let units,
      defaultValues,
      objNow = tsToObj(tsNow, offsetProvis);
    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["gregorianToWeek"])(objNow);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["gregorianToOrdinal"])(objNow);
    } else {
      units = orderedUnits;
      defaultValues = defaultUnitValues;
    }

    // set default values for missing stuff
    let foundFirst = false;
    for (const u of units) {
      const v = normalized[u];
      if (!Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u] = defaultValues[u];
      } else {
        normalized[u] = objNow[u];
      }
    }

    // make sure the values we have are in range
    const higherOrderInvalid = useWeekData
        ? Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["hasInvalidWeekData"])(normalized)
        : containsOrdinal
          ? Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["hasInvalidOrdinalData"])(normalized)
          : Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["hasInvalidGregorianData"])(normalized),
      invalid = higherOrderInvalid || Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["hasInvalidTimeData"])(normalized);

    if (invalid) {
      return DateTime.invalid(invalid);
    }

    // compute the actual time
    const gregorian = useWeekData
        ? Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["weekToGregorian"])(normalized)
        : containsOrdinal
          ? Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["ordinalToGregorian"])(normalized)
          : normalized,
      [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse),
      inst = new DateTime({
        ts: tsFinal,
        zone: zoneToUse,
        o: offsetFinal,
        loc
      });

    // gregorian data + weekday serves only to validate
    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return DateTime.invalid(
        "mismatched weekday",
        `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`
      );
    }

    return inst;
  }

  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(text, opts = {}) {
    const [vals, parsedZone] = Object(_impl_regexParser_js__WEBPACK_IMPORTED_MODULE_10__["parseISODate"])(text);
    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text);
  }

  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(text, opts = {}) {
    const [vals, parsedZone] = Object(_impl_regexParser_js__WEBPACK_IMPORTED_MODULE_10__["parseRFC2822Date"])(text);
    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text);
  }

  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(text, opts = {}) {
    const [vals, parsedZone] = Object(_impl_regexParser_js__WEBPACK_IMPORTED_MODULE_10__["parseHTTPDate"])(text);
    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
  }

  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @see https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(text, fmt, opts = {}) {
    if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(text) || Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(fmt)) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["InvalidArgumentError"]("fromFormat requires an input string and a format");
    }

    const { locale = null, numberingSystem = null } = opts,
      localeToUse = _impl_locale_js__WEBPACK_IMPORTED_MODULE_6__["default"].fromOpts({
        locale,
        numberingSystem,
        defaultToEN: true
      }),
      [vals, parsedZone, invalid] = Object(_impl_tokenParser_js__WEBPACK_IMPORTED_MODULE_11__["parseFromTokens"])(localeToUse, text, fmt);
    if (invalid) {
      return DateTime.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text);
    }
  }

  /**
   * @deprecated use fromFormat instead
   */
  static fromString(text, fmt, opts = {}) {
    return DateTime.fromFormat(text, fmt, opts);
  }

  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(text, opts = {}) {
    const [vals, parsedZone] = Object(_impl_regexParser_js__WEBPACK_IMPORTED_MODULE_10__["parseSQL"])(text);
    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text);
  }

  /**
   * Create an invalid DateTime.
   * @param {string} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["InvalidArgumentError"]("need to specify a reason the DateTime is invalid");
    }

    const invalid = reason instanceof _impl_invalid_js__WEBPACK_IMPORTED_MODULE_15__["default"] ? reason : new _impl_invalid_js__WEBPACK_IMPORTED_MODULE_15__["default"](reason, explanation);

    if (_settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].throwOnInvalid) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["InvalidDateTimeError"](invalid);
    } else {
      return new DateTime({ invalid });
    }
  }

  /**
   * Check if an object is a DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(o) {
    return (o && o.isLuxonDateTime) || false;
  }

  // INFO

  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(unit) {
    return this[unit];
  }

  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }

  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }

  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }

  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }

  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }

  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }

  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }

  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }

  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }

  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }

  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }

  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }

  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }

  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }

  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }

  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }

  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
  }

  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
  }

  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
  }

  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["gregorianToOrdinal"])(this.c).ordinal : NaN;
  }

  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? _info_js__WEBPACK_IMPORTED_MODULE_3__["default"].months("short", { locale: this.locale })[this.month - 1] : null;
  }

  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? _info_js__WEBPACK_IMPORTED_MODULE_3__["default"].months("long", { locale: this.locale })[this.month - 1] : null;
  }

  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? _info_js__WEBPACK_IMPORTED_MODULE_3__["default"].weekdays("short", { locale: this.locale })[this.weekday - 1] : null;
  }

  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? _info_js__WEBPACK_IMPORTED_MODULE_3__["default"].weekdays("long", { locale: this.locale })[this.weekday - 1] : null;
  }

  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.local().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }

  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "short",
        locale: this.locale
      });
    } else {
      return null;
    }
  }

  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "long",
        locale: this.locale
      });
    } else {
      return null;
    }
  }

  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.universal : null;
  }

  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    if (this.isOffsetFixed) {
      return false;
    } else {
      return (
        this.offset > this.set({ month: 1 }).offset || this.offset > this.set({ month: 5 }).offset
      );
    }
  }

  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isLeapYear"])(this.year);
  }

  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["daysInMonth"])(this.year, this.month);
  }

  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["daysInYear"])(this.year) : NaN;
  }

  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["weeksInWeekYear"])(this.weekYear) : NaN;
  }

  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOpts(opts = {}) {
    const { locale, numberingSystem, calendar } = _impl_formatter_js__WEBPACK_IMPORTED_MODULE_4__["default"].create(
      this.loc.clone(opts),
      opts
    ).resolvedOptions(this);
    return { locale, numberingSystem, outputCalendar: calendar };
  }

  // TRANSFORM

  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(offset = 0, opts = {}) {
    return this.setZone(_zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_5__["default"].instance(offset), opts);
  }

  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(_settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultZone);
  }

  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link plus}. You may wish to use {@link toLocal} and {@link toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
    zone = Object(_impl_zoneUtil_js__WEBPACK_IMPORTED_MODULE_8__["normalizeZone"])(zone, _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultZone);
    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return DateTime.invalid(unsupportedZone(zone));
    } else {
      let newTS = this.ts;
      if (keepLocalTime || keepCalendarTime) {
        const offsetGuess = zone.offset(this.ts);
        const asObj = this.toObject();
        [newTS] = objToTS(asObj, offsetGuess, zone);
      }
      return clone(this, { ts: newTS, zone });
    }
  }

  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
    return clone(this, { loc });
  }

  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(locale) {
    return this.reconfigure({ locale });
  }

  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link reconfigure} and {@link setZone}.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(values) {
    if (!this.isValid) return this;

    const normalized = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["normalizeObject"])(values, normalizeUnit, []),
      settingWeekStuff =
        !Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(normalized.weekYear) ||
        !Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(normalized.weekNumber) ||
        !Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(normalized.weekday);

    let mixed;
    if (settingWeekStuff) {
      mixed = Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["weekToGregorian"])(Object.assign(Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["gregorianToWeek"])(this.c), normalized));
    } else if (!Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(normalized.ordinal)) {
      mixed = Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["ordinalToGregorian"])(Object.assign(Object(_impl_conversions_js__WEBPACK_IMPORTED_MODULE_12__["gregorianToOrdinal"])(this.c), normalized));
    } else {
      mixed = Object.assign(this.toObject(), normalized);

      // if we didn't set the day but we ended up on an overflow date,
      // use the last day of the right month
      if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isUndefined"])(normalized.day)) {
        mixed.day = Math.min(Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["daysInMonth"])(mixed.year, mixed.month), mixed.day);
      }
    }

    const [ts, o] = objToTS(mixed, this.o, this.zone);
    return clone(this, { ts, o });
  }

  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.local().plus(123) //~> in 123 milliseconds
   * @example DateTime.local().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.local().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.local().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.local().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.local().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(duration) {
    if (!this.isValid) return this;
    const dur = Object(_duration_js__WEBPACK_IMPORTED_MODULE_0__["friendlyDuration"])(duration);
    return clone(this, adjustTime(this, dur));
  }

  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
  */
  minus(duration) {
    if (!this.isValid) return this;
    const dur = Object(_duration_js__WEBPACK_IMPORTED_MODULE_0__["friendlyDuration"])(duration).negate();
    return clone(this, adjustTime(this, dur));
  }

  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(unit) {
    if (!this.isValid) return this;
    const o = {},
      normalizedUnit = _duration_js__WEBPACK_IMPORTED_MODULE_0__["default"].normalizeUnit(unit);
    switch (normalizedUnit) {
      case "years":
        o.month = 1;
      // falls through
      case "quarters":
      case "months":
        o.day = 1;
      // falls through
      case "weeks":
      case "days":
        o.hour = 0;
      // falls through
      case "hours":
        o.minute = 0;
      // falls through
      case "minutes":
        o.second = 0;
      // falls through
      case "seconds":
        o.millisecond = 0;
        break;
      case "milliseconds":
        break;
      // no default, invalid units throw in normalizeUnit()
    }

    if (normalizedUnit === "weeks") {
      o.weekday = 1;
    }

    if (normalizedUnit === "quarters") {
      const q = Math.ceil(this.month / 3);
      o.month = (q - 1) * 3 + 1;
    }

    return this.set(o);
  }

  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'month', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(unit) {
    return this.isValid
      ? this.plus({ [unit]: 1 })
          .startOf(unit)
          .minus(1)
      : this;
  }

  // OUTPUT

  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @see https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options
   * @example DateTime.local().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.local().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.local().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.local().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    return this.isValid
      ? _impl_formatter_js__WEBPACK_IMPORTED_MODULE_4__["default"].create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt)
      : INVALID;
  }

  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param opts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @example DateTime.local().toLocaleString(); //=> 4/20/2017
   * @example DateTime.local().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.local().toLocaleString({ locale: 'en-gb' }); //=> '20/04/2017'
   * @example DateTime.local().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.local().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.local().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.local().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.local().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.local().toLocaleString({ hour: '2-digit', minute: '2-digit', hour12: false }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(opts = _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATE_SHORT"]) {
    return this.isValid
      ? _impl_formatter_js__WEBPACK_IMPORTED_MODULE_4__["default"].create(this.loc.clone(opts), opts).formatDateTime(this)
      : INVALID;
  }

  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.local().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(opts = {}) {
    return this.isValid
      ? _impl_formatter_js__WEBPACK_IMPORTED_MODULE_4__["default"].create(this.loc.clone(opts), opts).formatDateTimeParts(this)
      : [];
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.local().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.local().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.local().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  toISO(opts = {}) {
    if (!this.isValid) {
      return null;
    }

    return `${this.toISODate(opts)}T${this.toISOTime(opts)}`;
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  toISODate({ format = "extended" } = {}) {
    let fmt = format === "basic" ? "yyyyMMdd" : "yyyy-MM-dd";
    if (this.year > 9999) {
      fmt = "+" + fmt;
    }

    return toTechFormat(this, fmt);
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }

  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds = false,
    suppressSeconds = false,
    includeOffset = true,
    format = "extended"
  } = {}) {
    return toTechTimeFormat(this, {
      suppressSeconds,
      suppressMilliseconds,
      includeOffset,
      format
    });
  }

  /**
   * Returns an RFC 2822-compatible string representation of this DateTime, always in UTC
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  toSQLDate() {
    return toTechFormat(this, "yyyy-MM-dd");
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.local().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.local().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.local().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset = true, includeZone = false } = {}) {
    return toTechTimeFormat(this, {
      includeOffset,
      includeZone,
      spaceZone: true
    });
  }

  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(opts = {}) {
    if (!this.isValid) {
      return null;
    }

    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
  }

  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : INVALID;
  }

  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }

  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }

  /**
   * Returns the epoch seconds of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1000 : NaN;
  }

  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }

  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }

  /**
   * Returns a Javascript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.local().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(opts = {}) {
    if (!this.isValid) return {};

    const base = Object.assign({}, this.c);

    if (opts.includeConfig) {
      base.outputCalendar = this.outputCalendar;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }
    return base;
  }

  /**
   * Returns a Javascript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }

  // COMPARE

  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(otherDateTime, unit = "milliseconds", opts = {}) {
    if (!this.isValid || !otherDateTime.isValid) {
      return _duration_js__WEBPACK_IMPORTED_MODULE_0__["default"].invalid(
        this.invalid || otherDateTime.invalid,
        "created by diffing an invalid DateTime"
      );
    }

    const durOpts = Object.assign(
      { locale: this.locale, numberingSystem: this.numberingSystem },
      opts
    );

    const units = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["maybeArray"])(unit).map(_duration_js__WEBPACK_IMPORTED_MODULE_0__["default"].normalizeUnit),
      otherIsLater = otherDateTime.valueOf() > this.valueOf(),
      earlier = otherIsLater ? this : otherDateTime,
      later = otherIsLater ? otherDateTime : this,
      diffed = Object(_impl_diff_js__WEBPACK_IMPORTED_MODULE_9__["default"])(earlier, later, units, durOpts);

    return otherIsLater ? diffed.negate() : diffed;
  }

  /**
   * Return the difference between this DateTime and right now.
   * See {@link diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(unit = "milliseconds", opts = {}) {
    return this.diff(DateTime.local(), unit, opts);
  }

  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  until(otherDateTime) {
    return this.isValid ? _interval_js__WEBPACK_IMPORTED_MODULE_1__["default"].fromDateTimes(this, otherDateTime) : this;
  }

  /**
   * Return whether this DateTime is in the same unit of time as another DateTime
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @example DateTime.local().hasSame(otherDT, 'day'); //~> true if both the same calendar day
   * @return {boolean}
   */
  hasSame(otherDateTime, unit) {
    if (!this.isValid) return false;
    if (unit === "millisecond") {
      return this.valueOf() === otherDateTime.valueOf();
    } else {
      const inputMs = otherDateTime.valueOf();
      return this.startOf(unit) <= inputMs && inputMs <= this.endOf(unit);
    }
  }

  /**
   * Equality check
   * Two DateTimes are equal iff they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(other) {
    return (
      this.isValid &&
      other.isValid &&
      this.valueOf() === other.valueOf() &&
      this.zone.equals(other.zone) &&
      this.loc.equals(other.loc)
    );
  }

  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.local()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {boolean} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.local().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.local().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.local().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.local().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.local().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.local().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(options = {}) {
    if (!this.isValid) return null;
    const base = options.base || DateTime.fromObject({ zone: this.zone }),
      padding = options.padding ? (this < base ? -options.padding : options.padding) : 0;
    return diffRelative(
      base,
      this.plus(padding),
      Object.assign(options, {
        numeric: "always",
        units: ["years", "months", "days", "hours", "minutes", "seconds"]
      })
    );
  }

  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.local()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.local().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.local().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.local().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.local().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(options = {}) {
    if (!this.isValid) return null;

    return diffRelative(
      options.base || DateTime.fromObject({ zone: this.zone }),
      this,
      Object.assign(options, {
        numeric: "auto",
        units: ["years", "months", "days"],
        calendary: true
      })
    );
  }

  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...dateTimes) {
    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["InvalidArgumentError"]("min requires all arguments be DateTimes");
    }
    return Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["bestBy"])(dateTimes, i => i.valueOf(), Math.min);
  }

  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...dateTimes) {
    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["InvalidArgumentError"]("max requires all arguments be DateTimes");
    }
    return Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["bestBy"])(dateTimes, i => i.valueOf(), Math.max);
  }

  // MISC

  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(text, fmt, options = {}) {
    const { locale = null, numberingSystem = null } = options,
      localeToUse = _impl_locale_js__WEBPACK_IMPORTED_MODULE_6__["default"].fromOpts({
        locale,
        numberingSystem,
        defaultToEN: true
      });
    return Object(_impl_tokenParser_js__WEBPACK_IMPORTED_MODULE_11__["explainFromTokens"])(localeToUse, text, fmt);
  }

  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(text, fmt, options = {}) {
    return DateTime.fromFormatExplain(text, fmt, options);
  }

  // FORMAT PRESETS

  /**
   * {@link toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATE_SHORT"];
  }

  /**
   * {@link toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATE_MED"];
  }

  /**
   * {@link toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATE_FULL"];
  }

  /**
   * {@link toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATE_HUGE"];
  }

  /**
   * {@link toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["TIME_SIMPLE"];
  }

  /**
   * {@link toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["TIME_WITH_SECONDS"];
  }

  /**
   * {@link toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["TIME_WITH_SHORT_OFFSET"];
  }

  /**
   * {@link toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["TIME_WITH_LONG_OFFSET"];
  }

  /**
   * {@link toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["TIME_24_SIMPLE"];
  }

  /**
   * {@link toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["TIME_24_WITH_SECONDS"];
  }

  /**
   * {@link toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["TIME_24_WITH_SHORT_OFFSET"];
  }

  /**
   * {@link toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["TIME_24_WITH_LONG_OFFSET"];
  }

  /**
   * {@link toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATETIME_SHORT"];
  }

  /**
   * {@link toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATETIME_SHORT_WITH_SECONDS"];
  }

  /**
   * {@link toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATETIME_MED"];
  }

  /**
   * {@link toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATETIME_MED_WITH_SECONDS"];
  }

  /**
   * {@link toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATETIME_MED_WITH_WEEKDAY"];
  }

  /**
   * {@link toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATETIME_FULL"];
  }

  /**
   * {@link toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATETIME_FULL_WITH_SECONDS"];
  }

  /**
   * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATETIME_HUGE"];
  }

  /**
   * {@link toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return _impl_formats_js__WEBPACK_IMPORTED_MODULE_13__["DATETIME_HUGE_WITH_SECONDS"];
  }
}

/**
 * @private
 */
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_7__["isNumber"])(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_14__["InvalidArgumentError"](
      `Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`
    );
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/duration.js":
/*!********************************************!*\
  !*** ./node_modules/luxon/src/duration.js ***!
  \********************************************/
/*! exports provided: default, friendlyDuration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Duration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "friendlyDuration", function() { return friendlyDuration; });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors.js */ "./node_modules/luxon/src/errors.js");
/* harmony import */ var _impl_formatter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./impl/formatter.js */ "./node_modules/luxon/src/impl/formatter.js");
/* harmony import */ var _impl_invalid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./impl/invalid.js */ "./node_modules/luxon/src/impl/invalid.js");
/* harmony import */ var _impl_locale_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./impl/locale.js */ "./node_modules/luxon/src/impl/locale.js");
/* harmony import */ var _impl_regexParser_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./impl/regexParser.js */ "./node_modules/luxon/src/impl/regexParser.js");
/* harmony import */ var _impl_util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./impl/util.js */ "./node_modules/luxon/src/impl/util.js");
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings.js */ "./node_modules/luxon/src/settings.js");








const INVALID = "Invalid Duration";

// unit conversion constants
const lowOrderMatrix = {
    weeks: {
      days: 7,
      hours: 7 * 24,
      minutes: 7 * 24 * 60,
      seconds: 7 * 24 * 60 * 60,
      milliseconds: 7 * 24 * 60 * 60 * 1000
    },
    days: {
      hours: 24,
      minutes: 24 * 60,
      seconds: 24 * 60 * 60,
      milliseconds: 24 * 60 * 60 * 1000
    },
    hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1000 },
    minutes: { seconds: 60, milliseconds: 60 * 1000 },
    seconds: { milliseconds: 1000 }
  },
  casualMatrix = Object.assign(
    {
      years: {
        months: 12,
        weeks: 52,
        days: 365,
        hours: 365 * 24,
        minutes: 365 * 24 * 60,
        seconds: 365 * 24 * 60 * 60,
        milliseconds: 365 * 24 * 60 * 60 * 1000
      },
      quarters: {
        months: 3,
        weeks: 13,
        days: 91,
        hours: 91 * 24,
        minutes: 91 * 24 * 60,
        milliseconds: 91 * 24 * 60 * 60 * 1000
      },
      months: {
        weeks: 4,
        days: 30,
        hours: 30 * 24,
        minutes: 30 * 24 * 60,
        seconds: 30 * 24 * 60 * 60,
        milliseconds: 30 * 24 * 60 * 60 * 1000
      }
    },
    lowOrderMatrix
  ),
  daysInYearAccurate = 146097.0 / 400,
  daysInMonthAccurate = 146097.0 / 4800,
  accurateMatrix = Object.assign(
    {
      years: {
        months: 12,
        weeks: daysInYearAccurate / 7,
        days: daysInYearAccurate,
        hours: daysInYearAccurate * 24,
        minutes: daysInYearAccurate * 24 * 60,
        seconds: daysInYearAccurate * 24 * 60 * 60,
        milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1000
      },
      quarters: {
        months: 3,
        weeks: daysInYearAccurate / 28,
        days: daysInYearAccurate / 4,
        hours: (daysInYearAccurate * 24) / 4,
        minutes: (daysInYearAccurate * 24 * 60) / 4,
        seconds: (daysInYearAccurate * 24 * 60 * 60) / 4,
        milliseconds: (daysInYearAccurate * 24 * 60 * 60 * 1000) / 4
      },
      months: {
        weeks: daysInMonthAccurate / 7,
        days: daysInMonthAccurate,
        hours: daysInMonthAccurate * 24,
        minutes: daysInMonthAccurate * 24 * 60,
        seconds: daysInMonthAccurate * 24 * 60 * 60,
        milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1000
      }
    },
    lowOrderMatrix
  );

// units ordered by size
const orderedUnits = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
];

const reverseUnits = orderedUnits.slice(0).reverse();

// clone really means "create another instance just like this one, but with these changes"
function clone(dur, alts, clear = false) {
  // deep merge for vals
  const conf = {
    values: clear ? alts.values : Object.assign({}, dur.values, alts.values || {}),
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy
  };
  return new Duration(conf);
}

function antiTrunc(n) {
  return n < 0 ? Math.floor(n) : Math.ceil(n);
}

// NB: mutates parameters
function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
  const conv = matrix[toUnit][fromUnit],
    raw = fromMap[fromUnit] / conv,
    sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]),
    // ok, so this is wild, but see the matrix in the tests
    added =
      !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
  toMap[toUnit] += added;
  fromMap[fromUnit] -= added * conv;
}

// NB: mutates parameters
function normalizeValues(matrix, vals) {
  reverseUnits.reduce((previous, current) => {
    if (!Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["isUndefined"])(vals[current])) {
      if (previous) {
        convert(matrix, vals, previous, vals, current);
      }
      return current;
    } else {
      return previous;
    }
  }, null);
}

/**
 * A Duration object represents a period of time, like "2 months" or "1 day, 1 hour". Conceptually, it's just a map of units to their quantities, accompanied by some additional configuration and methods for creating, parsing, interrogating, transforming, and formatting them. They can be used on their own or in conjunction with other Luxon types; for example, you can use {@link DateTime.plus} to add a Duration object to a DateTime, producing another DateTime.
 *
 * Here is a brief overview of commonly used methods and getters in Duration:
 *
 * * **Creation** To create a Duration, use {@link Duration.fromMillis}, {@link Duration.fromObject}, or {@link Duration.fromISO}.
 * * **Unit values** See the {@link Duration.years}, {@link Duration.months}, {@link Duration.weeks}, {@link Duration.days}, {@link Duration.hours}, {@link Duration.minutes}, {@link Duration.seconds}, {@link Duration.milliseconds} accessors.
 * * **Configuration** See  {@link Duration.locale} and {@link Duration.numberingSystem} accessors.
 * * **Transformation** To create new Durations out of old ones use {@link Duration.plus}, {@link Duration.minus}, {@link Duration.normalize}, {@link Duration.set}, {@link Duration.reconfigure}, {@link Duration.shiftTo}, and {@link Duration.negate}.
 * * **Output** To convert the Duration into other representations, see {@link Duration.as}, {@link Duration.toISO}, {@link Duration.toFormat}, and {@link Duration.toJSON}
 *
 * There's are more methods documented below. In addition, for more information on subtler topics like internationalization and validity, see the external documentation.
 */
class Duration {
  /**
   * @private
   */
  constructor(config) {
    const accurate = config.conversionAccuracy === "longterm" || false;
    /**
     * @access private
     */
    this.values = config.values;
    /**
     * @access private
     */
    this.loc = config.loc || _impl_locale_js__WEBPACK_IMPORTED_MODULE_3__["default"].create();
    /**
     * @access private
     */
    this.conversionAccuracy = accurate ? "longterm" : "casual";
    /**
     * @access private
     */
    this.invalid = config.invalid || null;
    /**
     * @access private
     */
    this.matrix = accurate ? accurateMatrix : casualMatrix;
    /**
     * @access private
     */
    this.isLuxonDuration = true;
  }

  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(count, opts) {
    return Duration.fromObject(Object.assign({ milliseconds: count }, opts));
  }

  /**
   * Create a Duration from a Javascript object with keys like 'years' and 'hours.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {string} [obj.locale='en-US'] - the locale to use
   * @param {string} obj.numberingSystem - the numbering system to use
   * @param {string} [obj.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromObject(obj) {
    if (obj == null || typeof obj !== "object") {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["InvalidArgumentError"](
        `Duration.fromObject: argument expected to be an object, got ${
          obj === null ? "null" : typeof obj
        }`
      );
    }
    return new Duration({
      values: Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["normalizeObject"])(obj, Duration.normalizeUnit, [
        "locale",
        "numberingSystem",
        "conversionAccuracy",
        "zone" // a bit of debt; it's super inconvenient internally not to be able to blindly pass this
      ]),
      loc: _impl_locale_js__WEBPACK_IMPORTED_MODULE_3__["default"].fromObject(obj),
      conversionAccuracy: obj.conversionAccuracy
    });
  }

  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(text, opts) {
    const [parsed] = Object(_impl_regexParser_js__WEBPACK_IMPORTED_MODULE_4__["parseISODuration"])(text);
    if (parsed) {
      const obj = Object.assign(parsed, opts);
      return Duration.fromObject(obj);
    } else {
      return Duration.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
    }
  }

  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["InvalidArgumentError"]("need to specify a reason the Duration is invalid");
    }

    const invalid = reason instanceof _impl_invalid_js__WEBPACK_IMPORTED_MODULE_2__["default"] ? reason : new _impl_invalid_js__WEBPACK_IMPORTED_MODULE_2__["default"](reason, explanation);

    if (_settings_js__WEBPACK_IMPORTED_MODULE_6__["default"].throwOnInvalid) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["InvalidDurationError"](invalid);
    } else {
      return new Duration({ invalid });
    }
  }

  /**
   * @private
   */
  static normalizeUnit(unit) {
    const normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[unit ? unit.toLowerCase() : unit];

    if (!normalized) throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["InvalidUnitError"](unit);

    return normalized;
  }

  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(o) {
    return (o && o.isLuxonDuration) || false;
  }

  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }

  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }

  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * The duration will be converted to the set of units in the format string using {@link Duration.shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    // reverse-compat since 1.2; we always round down now, never up, and we do it by default
    const fmtOpts = Object.assign({}, opts, {
      floor: opts.round !== false && opts.floor !== false
    });
    return this.isValid
      ? _impl_formatter_js__WEBPACK_IMPORTED_MODULE_1__["default"].create(this.loc, fmtOpts).formatDurationFromString(this, fmt)
      : INVALID;
  }

  /**
   * Returns a Javascript object with this Duration's values.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject(opts = {}) {
    if (!this.isValid) return {};

    const base = Object.assign({}, this.values);

    if (opts.includeConfig) {
      base.conversionAccuracy = this.conversionAccuracy;
      base.numberingSystem = this.loc.numberingSystem;
      base.locale = this.loc.locale;
    }
    return base;
  }

  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    // we could use the formatter, but this is an easier way to get the minimum string
    if (!this.isValid) return null;

    let s = "P";
    if (this.years !== 0) s += this.years + "Y";
    if (this.months !== 0 || this.quarters !== 0) s += this.months + this.quarters * 3 + "M";
    if (this.weeks !== 0) s += this.weeks + "W";
    if (this.days !== 0) s += this.days + "D";
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
      s += "T";
    if (this.hours !== 0) s += this.hours + "H";
    if (this.minutes !== 0) s += this.minutes + "M";
    if (this.seconds !== 0 || this.milliseconds !== 0)
      // this will handle "floating point madness" by removing extra decimal places
      // https://stackoverflow.com/questions/588004/is-floating-point-math-broken
      s += Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["roundTo"])(this.seconds + this.milliseconds / 1000, 3) + "S";
    if (s === "P") s += "T0S";
    return s;
  }

  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }

  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }

  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  valueOf() {
    return this.as("milliseconds");
  }

  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(duration) {
    if (!this.isValid) return this;

    const dur = friendlyDuration(duration),
      result = {};

    for (const k of orderedUnits) {
      if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["hasOwnProperty"])(dur.values, k) || Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["hasOwnProperty"])(this.values, k)) {
        result[k] = dur.get(k) + this.get(k);
      }
    }

    return clone(this, { values: result }, true);
  }

  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(duration) {
    if (!this.isValid) return this;

    const dur = friendlyDuration(duration);
    return this.plus(dur.negate());
  }

  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnit(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnit((x, u) => u === "hour" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(fn) {
    if (!this.isValid) return this;
    const result = {};
    for (const k of Object.keys(this.values)) {
      result[k] = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["asNumber"])(fn(this.values[k], k));
    }
    return clone(this, { values: result }, true);
  }

  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).years //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).months //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).days //=> 3
   * @return {number}
   */
  get(unit) {
    return this[Duration.normalizeUnit(unit)];
  }

  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(values) {
    if (!this.isValid) return this;

    const mixed = Object.assign(this.values, Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["normalizeObject"])(values, Duration.normalizeUnit, []));
    return clone(this, { values: mixed });
  }

  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale, numberingSystem, conversionAccuracy } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem }),
      opts = { loc };

    if (conversionAccuracy) {
      opts.conversionAccuracy = conversionAccuracy;
    }

    return clone(this, opts);
  }

  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  }

  /**
   * Reduce this Duration to its canonical representation in its current units.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid) return this;
    const vals = this.toObject();
    normalizeValues(this.matrix, vals);
    return clone(this, { values: vals }, true);
  }

  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...units) {
    if (!this.isValid) return this;

    if (units.length === 0) {
      return this;
    }

    units = units.map(u => Duration.normalizeUnit(u));

    const built = {},
      accumulated = {},
      vals = this.toObject();
    let lastUnit;

    normalizeValues(this.matrix, vals);

    for (const k of orderedUnits) {
      if (units.indexOf(k) >= 0) {
        lastUnit = k;

        let own = 0;

        // anything we haven't boiled down yet should get boiled to this unit
        for (const ak in accumulated) {
          own += this.matrix[ak][k] * accumulated[ak];
          accumulated[ak] = 0;
        }

        // plus anything that's already in this unit
        if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["isNumber"])(vals[k])) {
          own += vals[k];
        }

        const i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = own - i; // we'd like to absorb these fractions in another unit

        // plus anything further down the chain that should be rolled up in to this
        for (const down in vals) {
          if (orderedUnits.indexOf(down) > orderedUnits.indexOf(k)) {
            convert(this.matrix, vals, down, built, k);
          }
        }
        // otherwise, keep it in the wings to boil it later
      } else if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["isNumber"])(vals[k])) {
        accumulated[k] = vals[k];
      }
    }

    // anything leftover becomes the decimal for the last unit
    // lastUnit must be defined since units is not empty
    for (const key in accumulated) {
      if (accumulated[key] !== 0) {
        built[lastUnit] +=
          key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
      }
    }

    return clone(this, { values: built }, true).normalize();
  }

  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid) return this;
    const negated = {};
    for (const k of Object.keys(this.values)) {
      negated[k] = -this.values[k];
    }
    return clone(this, { values: negated }, true);
  }

  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }

  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }

  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }

  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }

  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }

  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }

  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }

  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }

  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }

  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }

  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }

  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }

  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    if (!this.loc.equals(other.loc)) {
      return false;
    }

    for (const u of orderedUnits) {
      if (this.values[u] !== other.values[u]) {
        return false;
      }
    }
    return true;
  }
}

/**
 * @private
 */
function friendlyDuration(durationish) {
  if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["isNumber"])(durationish)) {
    return Duration.fromMillis(durationish);
  } else if (Duration.isDuration(durationish)) {
    return durationish;
  } else if (typeof durationish === "object") {
    return Duration.fromObject(durationish);
  } else {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["InvalidArgumentError"](
      `Unknown duration argument ${durationish} of type ${typeof durationish}`
    );
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/errors.js":
/*!******************************************!*\
  !*** ./node_modules/luxon/src/errors.js ***!
  \******************************************/
/*! exports provided: InvalidDateTimeError, InvalidIntervalError, InvalidDurationError, ConflictingSpecificationError, InvalidUnitError, InvalidArgumentError, ZoneIsAbstractError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidDateTimeError", function() { return InvalidDateTimeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidIntervalError", function() { return InvalidIntervalError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidDurationError", function() { return InvalidDurationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConflictingSpecificationError", function() { return ConflictingSpecificationError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidUnitError", function() { return InvalidUnitError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvalidArgumentError", function() { return InvalidArgumentError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoneIsAbstractError", function() { return ZoneIsAbstractError; });
// these aren't really private, but nor are they really useful to document

/**
 * @private
 */
class LuxonError extends Error {}

/**
 * @private
 */
class InvalidDateTimeError extends LuxonError {
  constructor(reason) {
    super(`Invalid DateTime: ${reason.toMessage()}`);
  }
}

/**
 * @private
 */
class InvalidIntervalError extends LuxonError {
  constructor(reason) {
    super(`Invalid Interval: ${reason.toMessage()}`);
  }
}

/**
 * @private
 */
class InvalidDurationError extends LuxonError {
  constructor(reason) {
    super(`Invalid Duration: ${reason.toMessage()}`);
  }
}

/**
 * @private
 */
class ConflictingSpecificationError extends LuxonError {}

/**
 * @private
 */
class InvalidUnitError extends LuxonError {
  constructor(unit) {
    super(`Invalid unit ${unit}`);
  }
}

/**
 * @private
 */
class InvalidArgumentError extends LuxonError {}

/**
 * @private
 */
class ZoneIsAbstractError extends LuxonError {
  constructor() {
    super("Zone is an abstract class");
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/impl/conversions.js":
/*!****************************************************!*\
  !*** ./node_modules/luxon/src/impl/conversions.js ***!
  \****************************************************/
/*! exports provided: gregorianToWeek, weekToGregorian, gregorianToOrdinal, ordinalToGregorian, hasInvalidWeekData, hasInvalidOrdinalData, hasInvalidGregorianData, hasInvalidTimeData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gregorianToWeek", function() { return gregorianToWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weekToGregorian", function() { return weekToGregorian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gregorianToOrdinal", function() { return gregorianToOrdinal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ordinalToGregorian", function() { return ordinalToGregorian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasInvalidWeekData", function() { return hasInvalidWeekData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasInvalidOrdinalData", function() { return hasInvalidOrdinalData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasInvalidGregorianData", function() { return hasInvalidGregorianData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasInvalidTimeData", function() { return hasInvalidTimeData; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/luxon/src/impl/util.js");
/* harmony import */ var _invalid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invalid.js */ "./node_modules/luxon/src/impl/invalid.js");



const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

function unitOutOfRange(unit, value) {
  return new _invalid_js__WEBPACK_IMPORTED_MODULE_1__["default"](
    "unit out of range",
    `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`
  );
}

function dayOfWeek(year, month, day) {
  const js = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return js === 0 ? 7 : js;
}

function computeOrdinal(year, month, day) {
  return day + (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isLeapYear"])(year) ? leapLadder : nonLeapLadder)[month - 1];
}

function uncomputeOrdinal(year, ordinal) {
  const table = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isLeapYear"])(year) ? leapLadder : nonLeapLadder,
    month0 = table.findIndex(i => i < ordinal),
    day = ordinal - table[month0];
  return { month: month0 + 1, day };
}

/**
 * @private
 */

function gregorianToWeek(gregObj) {
  const { year, month, day } = gregObj,
    ordinal = computeOrdinal(year, month, day),
    weekday = dayOfWeek(year, month, day);

  let weekNumber = Math.floor((ordinal - weekday + 10) / 7),
    weekYear;

  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["weeksInWeekYear"])(weekYear);
  } else if (weekNumber > Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["weeksInWeekYear"])(year)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }

  return Object.assign({ weekYear, weekNumber, weekday }, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["timeObject"])(gregObj));
}

function weekToGregorian(weekData) {
  const { weekYear, weekNumber, weekday } = weekData,
    weekdayOfJan4 = dayOfWeek(weekYear, 1, 4),
    yearInDays = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["daysInYear"])(weekYear);

  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3,
    year;

  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["daysInYear"])(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["daysInYear"])(weekYear);
  } else {
    year = weekYear;
  }

  const { month, day } = uncomputeOrdinal(year, ordinal);

  return Object.assign({ year, month, day }, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["timeObject"])(weekData));
}

function gregorianToOrdinal(gregData) {
  const { year, month, day } = gregData,
    ordinal = computeOrdinal(year, month, day);

  return Object.assign({ year, ordinal }, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["timeObject"])(gregData));
}

function ordinalToGregorian(ordinalData) {
  const { year, ordinal } = ordinalData,
    { month, day } = uncomputeOrdinal(year, ordinal);

  return Object.assign({ year, month, day }, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["timeObject"])(ordinalData));
}

function hasInvalidWeekData(obj) {
  const validYear = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isInteger"])(obj.weekYear),
    validWeek = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["integerBetween"])(obj.weekNumber, 1, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["weeksInWeekYear"])(obj.weekYear)),
    validWeekday = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["integerBetween"])(obj.weekday, 1, 7);

  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.week);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  } else return false;
}

function hasInvalidOrdinalData(obj) {
  const validYear = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isInteger"])(obj.year),
    validOrdinal = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["integerBetween"])(obj.ordinal, 1, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["daysInYear"])(obj.year));

  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  } else return false;
}

function hasInvalidGregorianData(obj) {
  const validYear = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isInteger"])(obj.year),
    validMonth = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["integerBetween"])(obj.month, 1, 12),
    validDay = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["integerBetween"])(obj.day, 1, Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["daysInMonth"])(obj.year, obj.month));

  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  } else return false;
}

function hasInvalidTimeData(obj) {
  const { hour, minute, second, millisecond } = obj;
  const validHour =
      Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["integerBetween"])(hour, 0, 23) ||
      (hour === 24 && minute === 0 && second === 0 && millisecond === 0),
    validMinute = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["integerBetween"])(minute, 0, 59),
    validSecond = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["integerBetween"])(second, 0, 59),
    validMillisecond = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["integerBetween"])(millisecond, 0, 999);

  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  } else return false;
}


/***/ }),

/***/ "./node_modules/luxon/src/impl/diff.js":
/*!*********************************************!*\
  !*** ./node_modules/luxon/src/impl/diff.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _duration_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../duration.js */ "./node_modules/luxon/src/duration.js");


function dayDiff(earlier, later) {
  const utcDayStart = dt =>
      dt
        .toUTC(0, { keepLocalTime: true })
        .startOf("day")
        .valueOf(),
    ms = utcDayStart(later) - utcDayStart(earlier);
  return Math.floor(_duration_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromMillis(ms).as("days"));
}

function highOrderDiffs(cursor, later, units) {
  const differs = [
    ["years", (a, b) => b.year - a.year],
    ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
    [
      "weeks",
      (a, b) => {
        const days = dayDiff(a, b);
        return (days - (days % 7)) / 7;
      }
    ],
    ["days", dayDiff]
  ];

  const results = {};
  let lowestOrder, highWater;

  for (const [unit, differ] of differs) {
    if (units.indexOf(unit) >= 0) {
      lowestOrder = unit;

      let delta = differ(cursor, later);
      highWater = cursor.plus({ [unit]: delta });

      if (highWater > later) {
        cursor = cursor.plus({ [unit]: delta - 1 });
        delta -= 1;
      } else {
        cursor = highWater;
      }

      results[unit] = delta;
    }
  }

  return [cursor, results, highWater, lowestOrder];
}

/* harmony default export */ __webpack_exports__["default"] = (function(earlier, later, units, opts) {
  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);

  const remainingMillis = later - cursor;

  const lowerOrderUnits = units.filter(
    u => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0
  );

  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      highWater = cursor.plus({ [lowestOrder]: 1 });
    }

    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }

  const duration = _duration_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromObject(Object.assign(results, opts));

  if (lowerOrderUnits.length > 0) {
    return _duration_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromMillis(remainingMillis, opts)
      .shiftTo(...lowerOrderUnits)
      .plus(duration);
  } else {
    return duration;
  }
});


/***/ }),

/***/ "./node_modules/luxon/src/impl/digits.js":
/*!***********************************************!*\
  !*** ./node_modules/luxon/src/impl/digits.js ***!
  \***********************************************/
/*! exports provided: parseDigits, digitRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseDigits", function() { return parseDigits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "digitRegex", function() { return digitRegex; });
const numberingSystems = {
  arab: "[\u0660-\u0669]",
  arabext: "[\u06F0-\u06F9]",
  bali: "[\u1B50-\u1B59]",
  beng: "[\u09E6-\u09EF]",
  deva: "[\u0966-\u096F]",
  fullwide: "[\uFF10-\uFF19]",
  gujr: "[\u0AE6-\u0AEF]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[\u17E0-\u17E9]",
  knda: "[\u0CE6-\u0CEF]",
  laoo: "[\u0ED0-\u0ED9]",
  limb: "[\u1946-\u194F]",
  mlym: "[\u0D66-\u0D6F]",
  mong: "[\u1810-\u1819]",
  mymr: "[\u1040-\u1049]",
  orya: "[\u0B66-\u0B6F]",
  tamldec: "[\u0BE6-\u0BEF]",
  telu: "[\u0C66-\u0C6F]",
  thai: "[\u0E50-\u0E59]",
  tibt: "[\u0F20-\u0F29]",
  latn: "\\d"
};

const numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
};

// eslint-disable-next-line
const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");

function parseDigits(str) {
  let value = parseInt(str, 10);
  if (isNaN(value)) {
    value = "";
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);

      if (str[i].search(numberingSystems.hanidec) !== -1) {
        value += hanidecChars.indexOf(str[i]);
      } else {
        for (const key in numberingSystemsUTF16) {
          const [min, max] = numberingSystemsUTF16[key];
          if (code >= min && code <= max) {
            value += code - min;
          }
        }
      }
    }
    return parseInt(value, 10);
  } else {
    return value;
  }
}

function digitRegex({ numberingSystem }, append = "") {
  return new RegExp(`${numberingSystems[numberingSystem || "latn"]}${append}`);
}


/***/ }),

/***/ "./node_modules/luxon/src/impl/english.js":
/*!************************************************!*\
  !*** ./node_modules/luxon/src/impl/english.js ***!
  \************************************************/
/*! exports provided: monthsLong, monthsShort, monthsNarrow, months, weekdaysLong, weekdaysShort, weekdaysNarrow, weekdays, meridiems, erasLong, erasShort, erasNarrow, eras, meridiemForDateTime, weekdayForDateTime, monthForDateTime, eraForDateTime, formatRelativeTime, formatString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monthsLong", function() { return monthsLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monthsShort", function() { return monthsShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monthsNarrow", function() { return monthsNarrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "months", function() { return months; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weekdaysLong", function() { return weekdaysLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weekdaysShort", function() { return weekdaysShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weekdaysNarrow", function() { return weekdaysNarrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weekdays", function() { return weekdays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "meridiems", function() { return meridiems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "erasLong", function() { return erasLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "erasShort", function() { return erasShort; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "erasNarrow", function() { return erasNarrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eras", function() { return eras; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "meridiemForDateTime", function() { return meridiemForDateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weekdayForDateTime", function() { return weekdayForDateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "monthForDateTime", function() { return monthForDateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eraForDateTime", function() { return eraForDateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatRelativeTime", function() { return formatRelativeTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatString", function() { return formatString; });
/* harmony import */ var _formats_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./formats.js */ "./node_modules/luxon/src/impl/formats.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./node_modules/luxon/src/impl/util.js");



function stringify(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}

/**
 * @private
 */

const monthsLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function months(length) {
  switch (length) {
    case "narrow":
      return monthsNarrow;
    case "short":
      return monthsShort;
    case "long":
      return monthsLong;
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}

const weekdaysLong = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];

function weekdays(length) {
  switch (length) {
    case "narrow":
      return weekdaysNarrow;
    case "short":
      return weekdaysShort;
    case "long":
      return weekdaysLong;
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}

const meridiems = ["AM", "PM"];

const erasLong = ["Before Christ", "Anno Domini"];

const erasShort = ["BC", "AD"];

const erasNarrow = ["B", "A"];

function eras(length) {
  switch (length) {
    case "narrow":
      return erasNarrow;
    case "short":
      return erasShort;
    case "long":
      return erasLong;
    default:
      return null;
  }
}

function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}

function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}

function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}

function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}

function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
  const units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  };

  const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;

  if (numeric === "auto" && lastable) {
    const isDay = unit === "days";
    switch (count) {
      case 1:
        return isDay ? "tomorrow" : `next ${units[unit][0]}`;
      case -1:
        return isDay ? "yesterday" : `last ${units[unit][0]}`;
      case 0:
        return isDay ? "today" : `this ${units[unit][0]}`;
      default: // fall through
    }
  }

  const isInPast = Object.is(count, -0) || count < 0,
    fmtValue = Math.abs(count),
    singular = fmtValue === 1,
    lilUnits = units[unit],
    fmtUnit = narrow
      ? singular
        ? lilUnits[1]
        : lilUnits[2] || lilUnits[1]
      : singular
        ? units[unit][0]
        : unit;
  return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
}

function formatString(knownFormat) {
  // these all have the offsets removed because we don't have access to them
  // without all the intl stuff this is backfilling
  const filtered = Object(_util_js__WEBPACK_IMPORTED_MODULE_1__["pick"])(knownFormat, [
      "weekday",
      "era",
      "year",
      "month",
      "day",
      "hour",
      "minute",
      "second",
      "timeZoneName",
      "hour12"
    ]),
    key = stringify(filtered),
    dateTimeHuge = "EEEE, LLLL d, yyyy, h:mm a";
  switch (key) {
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATE_SHORT"]):
      return "M/d/yyyy";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATE_MED"]):
      return "LLL d, yyyy";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATE_FULL"]):
      return "LLLL d, yyyy";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATE_HUGE"]):
      return "EEEE, LLLL d, yyyy";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["TIME_SIMPLE"]):
      return "h:mm a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["TIME_WITH_SECONDS"]):
      return "h:mm:ss a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["TIME_WITH_SHORT_OFFSET"]):
      return "h:mm a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["TIME_WITH_LONG_OFFSET"]):
      return "h:mm a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["TIME_24_SIMPLE"]):
      return "HH:mm";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["TIME_24_WITH_SECONDS"]):
      return "HH:mm:ss";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["TIME_24_WITH_SHORT_OFFSET"]):
      return "HH:mm";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["TIME_24_WITH_LONG_OFFSET"]):
      return "HH:mm";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATETIME_SHORT"]):
      return "M/d/yyyy, h:mm a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATETIME_MED"]):
      return "LLL d, yyyy, h:mm a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATETIME_FULL"]):
      return "LLLL d, yyyy, h:mm a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATETIME_HUGE"]):
      return dateTimeHuge;
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATETIME_SHORT_WITH_SECONDS"]):
      return "M/d/yyyy, h:mm:ss a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATETIME_MED_WITH_SECONDS"]):
      return "LLL d, yyyy, h:mm:ss a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATETIME_MED_WITH_WEEKDAY"]):
      return "EEE, d LLL yyyy, h:mm a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATETIME_FULL_WITH_SECONDS"]):
      return "LLLL d, yyyy, h:mm:ss a";
    case stringify(_formats_js__WEBPACK_IMPORTED_MODULE_0__["DATETIME_HUGE_WITH_SECONDS"]):
      return "EEEE, LLLL d, yyyy, h:mm:ss a";
    default:
      return dateTimeHuge;
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/impl/formats.js":
/*!************************************************!*\
  !*** ./node_modules/luxon/src/impl/formats.js ***!
  \************************************************/
/*! exports provided: DATE_SHORT, DATE_MED, DATE_FULL, DATE_HUGE, TIME_SIMPLE, TIME_WITH_SECONDS, TIME_WITH_SHORT_OFFSET, TIME_WITH_LONG_OFFSET, TIME_24_SIMPLE, TIME_24_WITH_SECONDS, TIME_24_WITH_SHORT_OFFSET, TIME_24_WITH_LONG_OFFSET, DATETIME_SHORT, DATETIME_SHORT_WITH_SECONDS, DATETIME_MED, DATETIME_MED_WITH_SECONDS, DATETIME_MED_WITH_WEEKDAY, DATETIME_FULL, DATETIME_FULL_WITH_SECONDS, DATETIME_HUGE, DATETIME_HUGE_WITH_SECONDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_SHORT", function() { return DATE_SHORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_MED", function() { return DATE_MED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_FULL", function() { return DATE_FULL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_HUGE", function() { return DATE_HUGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIME_SIMPLE", function() { return TIME_SIMPLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIME_WITH_SECONDS", function() { return TIME_WITH_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIME_WITH_SHORT_OFFSET", function() { return TIME_WITH_SHORT_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIME_WITH_LONG_OFFSET", function() { return TIME_WITH_LONG_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIME_24_SIMPLE", function() { return TIME_24_SIMPLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIME_24_WITH_SECONDS", function() { return TIME_24_WITH_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIME_24_WITH_SHORT_OFFSET", function() { return TIME_24_WITH_SHORT_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIME_24_WITH_LONG_OFFSET", function() { return TIME_24_WITH_LONG_OFFSET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_SHORT", function() { return DATETIME_SHORT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_SHORT_WITH_SECONDS", function() { return DATETIME_SHORT_WITH_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_MED", function() { return DATETIME_MED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_MED_WITH_SECONDS", function() { return DATETIME_MED_WITH_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_MED_WITH_WEEKDAY", function() { return DATETIME_MED_WITH_WEEKDAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_FULL", function() { return DATETIME_FULL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_FULL_WITH_SECONDS", function() { return DATETIME_FULL_WITH_SECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_HUGE", function() { return DATETIME_HUGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATETIME_HUGE_WITH_SECONDS", function() { return DATETIME_HUGE_WITH_SECONDS; });
/**
 * @private
 */

const n = "numeric",
  s = "short",
  l = "long";

const DATE_SHORT = {
  year: n,
  month: n,
  day: n
};

const DATE_MED = {
  year: n,
  month: s,
  day: n
};

const DATE_FULL = {
  year: n,
  month: l,
  day: n
};

const DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l
};

const TIME_SIMPLE = {
  hour: n,
  minute: n
};

const TIME_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n
};

const TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};

const TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};

const TIME_24_SIMPLE = {
  hour: n,
  minute: n,
  hour12: false
};

/**
 * {@link toLocaleString}; format like '09:30:23', always 24-hour.
 */
const TIME_24_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
  hour12: false
};

/**
 * {@link toLocaleString}; format like '09:30:23 EDT', always 24-hour.
 */
const TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hour12: false,
  timeZoneName: s
};

/**
 * {@link toLocaleString}; format like '09:30:23 Eastern Daylight Time', always 24-hour.
 */
const TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hour12: false,
  timeZoneName: l
};

/**
 * {@link toLocaleString}; format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
 */
const DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n
};

/**
 * {@link toLocaleString}; format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
 */
const DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
  second: n
};

const DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n
};

const DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
  second: n
};

const DATETIME_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
  hour: n,
  minute: n
};

const DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  timeZoneName: s
};

const DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};

const DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  timeZoneName: l
};

const DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};


/***/ }),

/***/ "./node_modules/luxon/src/impl/formatter.js":
/*!**************************************************!*\
  !*** ./node_modules/luxon/src/impl/formatter.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Formatter; });
/* harmony import */ var _english_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./english.js */ "./node_modules/luxon/src/impl/english.js");
/* harmony import */ var _formats_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formats.js */ "./node_modules/luxon/src/impl/formats.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./node_modules/luxon/src/impl/util.js");




function stringifyTokens(splits, tokenToString) {
  let s = "";
  for (const token of splits) {
    if (token.literal) {
      s += token.val;
    } else {
      s += tokenToString(token.val);
    }
  }
  return s;
}

const macroTokenToFormatOpts = {
  D: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATE_SHORT"],
  DD: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATE_MED"],
  DDD: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATE_FULL"],
  DDDD: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATE_HUGE"],
  t: _formats_js__WEBPACK_IMPORTED_MODULE_1__["TIME_SIMPLE"],
  tt: _formats_js__WEBPACK_IMPORTED_MODULE_1__["TIME_WITH_SECONDS"],
  ttt: _formats_js__WEBPACK_IMPORTED_MODULE_1__["TIME_WITH_SHORT_OFFSET"],
  tttt: _formats_js__WEBPACK_IMPORTED_MODULE_1__["TIME_WITH_LONG_OFFSET"],
  T: _formats_js__WEBPACK_IMPORTED_MODULE_1__["TIME_24_SIMPLE"],
  TT: _formats_js__WEBPACK_IMPORTED_MODULE_1__["TIME_24_WITH_SECONDS"],
  TTT: _formats_js__WEBPACK_IMPORTED_MODULE_1__["TIME_24_WITH_SHORT_OFFSET"],
  TTTT: _formats_js__WEBPACK_IMPORTED_MODULE_1__["TIME_24_WITH_LONG_OFFSET"],
  f: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATETIME_SHORT"],
  ff: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATETIME_MED"],
  fff: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATETIME_FULL"],
  ffff: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATETIME_HUGE"],
  F: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATETIME_SHORT_WITH_SECONDS"],
  FF: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATETIME_MED_WITH_SECONDS"],
  FFF: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATETIME_FULL_WITH_SECONDS"],
  FFFF: _formats_js__WEBPACK_IMPORTED_MODULE_1__["DATETIME_HUGE_WITH_SECONDS"]
};

/**
 * @private
 */

class Formatter {
  static create(locale, opts = {}) {
    return new Formatter(locale, opts);
  }

  static parseFormat(fmt) {
    let current = null,
      currentFull = "",
      bracketed = false;
    const splits = [];
    for (let i = 0; i < fmt.length; i++) {
      const c = fmt.charAt(i);
      if (c === "'") {
        if (currentFull.length > 0) {
          splits.push({ literal: bracketed, val: currentFull });
        }
        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c;
      } else if (c === current) {
        currentFull += c;
      } else {
        if (currentFull.length > 0) {
          splits.push({ literal: false, val: currentFull });
        }
        currentFull = c;
        current = c;
      }
    }

    if (currentFull.length > 0) {
      splits.push({ literal: bracketed, val: currentFull });
    }

    return splits;
  }

  static macroTokenToFormatOpts(token) {
    return macroTokenToFormatOpts[token];
  }

  constructor(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }

  formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }
    const df = this.systemLoc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.format();
  }

  formatDateTime(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.format();
  }

  formatDateTimeParts(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.formatToParts();
  }

  resolvedOptions(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, Object.assign({}, this.opts, opts));
    return df.resolvedOptions();
  }

  num(n, p = 0) {
    // we get some perf out of doing this here, annoyingly
    if (this.opts.forceSimple) {
      return Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["padStart"])(n, p);
    }

    const opts = Object.assign({}, this.opts);

    if (p > 0) {
      opts.padTo = p;
    }

    return this.loc.numberFormatter(opts).format(n);
  }

  formatDateTimeFromString(dt, fmt) {
    const knownEnglish = this.loc.listingMode() === "en",
      useDateTimeFormatter =
        this.loc.outputCalendar && this.loc.outputCalendar !== "gregory" && Object(_util_js__WEBPACK_IMPORTED_MODULE_2__["hasFormatToParts"])(),
      string = (opts, extract) => this.loc.extract(dt, opts, extract),
      formatOffset = opts => {
        if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
          return "Z";
        }

        return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
      },
      meridiem = () =>
        knownEnglish
          ? _english_js__WEBPACK_IMPORTED_MODULE_0__["meridiemForDateTime"](dt)
          : string({ hour: "numeric", hour12: true }, "dayperiod"),
      month = (length, standalone) =>
        knownEnglish
          ? _english_js__WEBPACK_IMPORTED_MODULE_0__["monthForDateTime"](dt, length)
          : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"),
      weekday = (length, standalone) =>
        knownEnglish
          ? _english_js__WEBPACK_IMPORTED_MODULE_0__["weekdayForDateTime"](dt, length)
          : string(
              standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" },
              "weekday"
            ),
      maybeMacro = token => {
        const formatOpts = Formatter.macroTokenToFormatOpts(token);
        if (formatOpts) {
          return this.formatWithSystemDefault(dt, formatOpts);
        } else {
          return token;
        }
      },
      era = length =>
        knownEnglish ? _english_js__WEBPACK_IMPORTED_MODULE_0__["eraForDateTime"](dt, length) : string({ era: length }, "era"),
      tokenToString = token => {
        // Where possible: http://cldr.unicode.org/translation/date-time#TOC-Stand-Alone-vs.-Format-Styles
        switch (token) {
          // ms
          case "S":
            return this.num(dt.millisecond);
          case "u":
          // falls through
          case "SSS":
            return this.num(dt.millisecond, 3);
          // seconds
          case "s":
            return this.num(dt.second);
          case "ss":
            return this.num(dt.second, 2);
          // minutes
          case "m":
            return this.num(dt.minute);
          case "mm":
            return this.num(dt.minute, 2);
          // hours
          case "h":
            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
          case "hh":
            return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
          case "H":
            return this.num(dt.hour);
          case "HH":
            return this.num(dt.hour, 2);
          // offset
          case "Z":
            // like +6
            return formatOffset({ format: "narrow", allowZ: this.opts.allowZ });
          case "ZZ":
            // like +06:00
            return formatOffset({ format: "short", allowZ: this.opts.allowZ });
          case "ZZZ":
            // like +0600
            return formatOffset({ format: "techie", allowZ: this.opts.allowZ });
          case "ZZZZ":
            // like EST
            return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
          case "ZZZZZ":
            // like Eastern Standard Time
            return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
          // zone
          case "z":
            // like America/New_York
            return dt.zoneName;
          // meridiems
          case "a":
            return meridiem();
          // dates
          case "d":
            return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
          case "dd":
            return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
          // weekdays - standalone
          case "c":
            // like 1
            return this.num(dt.weekday);
          case "ccc":
            // like 'Tues'
            return weekday("short", true);
          case "cccc":
            // like 'Tuesday'
            return weekday("long", true);
          case "ccccc":
            // like 'T'
            return weekday("narrow", true);
          // weekdays - format
          case "E":
            // like 1
            return this.num(dt.weekday);
          case "EEE":
            // like 'Tues'
            return weekday("short", false);
          case "EEEE":
            // like 'Tuesday'
            return weekday("long", false);
          case "EEEEE":
            // like 'T'
            return weekday("narrow", false);
          // months - standalone
          case "L":
            // like 1
            return useDateTimeFormatter
              ? string({ month: "numeric", day: "numeric" }, "month")
              : this.num(dt.month);
          case "LL":
            // like 01, doesn't seem to work
            return useDateTimeFormatter
              ? string({ month: "2-digit", day: "numeric" }, "month")
              : this.num(dt.month, 2);
          case "LLL":
            // like Jan
            return month("short", true);
          case "LLLL":
            // like January
            return month("long", true);
          case "LLLLL":
            // like J
            return month("narrow", true);
          // months - format
          case "M":
            // like 1
            return useDateTimeFormatter
              ? string({ month: "numeric" }, "month")
              : this.num(dt.month);
          case "MM":
            // like 01
            return useDateTimeFormatter
              ? string({ month: "2-digit" }, "month")
              : this.num(dt.month, 2);
          case "MMM":
            // like Jan
            return month("short", false);
          case "MMMM":
            // like January
            return month("long", false);
          case "MMMMM":
            // like J
            return month("narrow", false);
          // years
          case "y":
            // like 2014
            return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
          case "yy":
            // like 14
            return useDateTimeFormatter
              ? string({ year: "2-digit" }, "year")
              : this.num(dt.year.toString().slice(-2), 2);
          case "yyyy":
            // like 0012
            return useDateTimeFormatter
              ? string({ year: "numeric" }, "year")
              : this.num(dt.year, 4);
          case "yyyyyy":
            // like 000012
            return useDateTimeFormatter
              ? string({ year: "numeric" }, "year")
              : this.num(dt.year, 6);
          // eras
          case "G":
            // like AD
            return era("short");
          case "GG":
            // like Anno Domini
            return era("long");
          case "GGGGG":
            return era("narrow");
          case "kk":
            return this.num(dt.weekYear.toString().slice(-2), 2);
          case "kkkk":
            return this.num(dt.weekYear, 4);
          case "W":
            return this.num(dt.weekNumber);
          case "WW":
            return this.num(dt.weekNumber, 2);
          case "o":
            return this.num(dt.ordinal);
          case "ooo":
            return this.num(dt.ordinal, 3);
          case "q":
            // like 1
            return this.num(dt.quarter);
          case "qq":
            // like 01
            return this.num(dt.quarter, 2);
          case "X":
            return this.num(Math.floor(dt.ts / 1000));
          case "x":
            return this.num(dt.ts);
          default:
            return maybeMacro(token);
        }
      };

    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
  }

  formatDurationFromString(dur, fmt) {
    const tokenToField = token => {
        switch (token[0]) {
          case "S":
            return "millisecond";
          case "s":
            return "second";
          case "m":
            return "minute";
          case "h":
            return "hour";
          case "d":
            return "day";
          case "M":
            return "month";
          case "y":
            return "year";
          default:
            return null;
        }
      },
      tokenToString = lildur => token => {
        const mapped = tokenToField(token);
        if (mapped) {
          return this.num(lildur.get(mapped), token.length);
        } else {
          return token;
        }
      },
      tokens = Formatter.parseFormat(fmt),
      realTokens = tokens.reduce(
        (found, { literal, val }) => (literal ? found : found.concat(val)),
        []
      ),
      collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter(t => t));
    return stringifyTokens(tokens, tokenToString(collapsed));
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/impl/invalid.js":
/*!************************************************!*\
  !*** ./node_modules/luxon/src/impl/invalid.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Invalid; });
class Invalid {
  constructor(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
  }

  toMessage() {
    if (this.explanation) {
      return `${this.reason}: ${this.explanation}`;
    } else {
      return this.reason;
    }
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/impl/locale.js":
/*!***********************************************!*\
  !*** ./node_modules/luxon/src/impl/locale.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Locale; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/luxon/src/impl/util.js");
/* harmony import */ var _english_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./english.js */ "./node_modules/luxon/src/impl/english.js");
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings.js */ "./node_modules/luxon/src/settings.js");
/* harmony import */ var _datetime_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../datetime.js */ "./node_modules/luxon/src/datetime.js");
/* harmony import */ var _formatter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./formatter.js */ "./node_modules/luxon/src/impl/formatter.js");






let intlDTCache = {};
function getCachedDTF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlDTCache[key];
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache[key] = dtf;
  }
  return dtf;
}

let intlNumCache = {};
function getCachedINF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let inf = intlNumCache[key];
  if (!inf) {
    inf = new Intl.NumberFormat(locString, opts);
    intlNumCache[key] = inf;
  }
  return inf;
}

let intlRelCache = {};
function getCachedRTF(locString, opts = {}) {
  const { base, ...cacheKeyOpts } = opts; // exclude `base` from the options
  const key = JSON.stringify([locString, cacheKeyOpts]);
  let inf = intlRelCache[key];
  if (!inf) {
    inf = new Intl.RelativeTimeFormat(locString, opts);
    intlRelCache[key] = inf;
  }
  return inf;
}

let sysLocaleCache = null;
function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasIntl"])()) {
    const computedSys = new Intl.DateTimeFormat().resolvedOptions().locale;
    // node sometimes defaults to "und". Override that because that is dumb
    sysLocaleCache = !computedSys || computedSys === "und" ? "en-US" : computedSys;
    return sysLocaleCache;
  } else {
    sysLocaleCache = "en-US";
    return sysLocaleCache;
  }
}

function parseLocaleString(localeStr) {
  // I really want to avoid writing a BCP 47 parser
  // see, e.g. https://github.com/wooorm/bcp-47
  // Instead, we'll do this:

  // a) if the string has no -u extensions, just leave it alone
  // b) if it does, use Intl to resolve everything
  // c) if Intl fails, try again without the -u

  const uIndex = localeStr.indexOf("-u-");
  if (uIndex === -1) {
    return [localeStr];
  } else {
    let options;
    const smaller = localeStr.substring(0, uIndex);
    try {
      options = getCachedDTF(localeStr).resolvedOptions();
    } catch (e) {
      options = getCachedDTF(smaller).resolvedOptions();
    }

    const { numberingSystem, calendar } = options;
    // return the smaller one so that we can append the calendar and numbering overrides to it
    return [smaller, numberingSystem, calendar];
  }
}

function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasIntl"])()) {
    if (outputCalendar || numberingSystem) {
      localeStr += "-u";

      if (outputCalendar) {
        localeStr += `-ca-${outputCalendar}`;
      }

      if (numberingSystem) {
        localeStr += `-nu-${numberingSystem}`;
      }
      return localeStr;
    } else {
      return localeStr;
    }
  } else {
    return [];
  }
}

function mapMonths(f) {
  const ms = [];
  for (let i = 1; i <= 12; i++) {
    const dt = _datetime_js__WEBPACK_IMPORTED_MODULE_3__["default"].utc(2016, i, 1);
    ms.push(f(dt));
  }
  return ms;
}

function mapWeekdays(f) {
  const ms = [];
  for (let i = 1; i <= 7; i++) {
    const dt = _datetime_js__WEBPACK_IMPORTED_MODULE_3__["default"].utc(2016, 11, 13 + i);
    ms.push(f(dt));
  }
  return ms;
}

function listStuff(loc, length, defaultOK, englishFn, intlFn) {
  const mode = loc.listingMode(defaultOK);

  if (mode === "error") {
    return null;
  } else if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}

function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
    return false;
  } else {
    return (
      loc.numberingSystem === "latn" ||
      !loc.locale ||
      loc.locale.startsWith("en") ||
      (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasIntl"])() && new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn")
    );
  }
}

/**
 * @private
 */

class PolyNumberFormatter {
  constructor(intl, forceSimple, opts) {
    this.padTo = opts.padTo || 0;
    this.floor = opts.floor || false;

    if (!forceSimple && Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasIntl"])()) {
      const intlOpts = { useGrouping: false };
      if (opts.padTo > 0) intlOpts.minimumIntegerDigits = opts.padTo;
      this.inf = getCachedINF(intl, intlOpts);
    }
  }

  format(i) {
    if (this.inf) {
      const fixed = this.floor ? Math.floor(i) : i;
      return this.inf.format(fixed);
    } else {
      // to match the browser's numberformatter defaults
      const fixed = this.floor ? Math.floor(i) : Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["roundTo"])(i, 3);
      return Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["padStart"])(fixed, this.padTo);
    }
  }
}

/**
 * @private
 */

class PolyDateFormatter {
  constructor(dt, intl, opts) {
    this.opts = opts;
    this.hasIntl = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasIntl"])();

    let z;
    if (dt.zone.universal && this.hasIntl) {
      // Chromium doesn't support fixed-offset zones like Etc/GMT+8 in its formatter,
      // See https://bugs.chromium.org/p/chromium/issues/detail?id=364374.
      // So we have to make do. Two cases:
      // 1. The format options tell us to show the zone. We can't do that, so the best
      // we can do is format the date in UTC.
      // 2. The format options don't tell us to show the zone. Then we can adjust them
      // the time and tell the formatter to show it to us in UTC, so that the time is right
      // and the bad zone doesn't show up.
      // We can clean all this up when Chrome fixes this.
      z = "UTC";
      if (opts.timeZoneName) {
        this.dt = dt;
      } else {
        this.dt = dt.offset === 0 ? dt : _datetime_js__WEBPACK_IMPORTED_MODULE_3__["default"].fromMillis(dt.ts + dt.offset * 60 * 1000);
      }
    } else if (dt.zone.type === "local") {
      this.dt = dt;
    } else {
      this.dt = dt;
      z = dt.zone.name;
    }

    if (this.hasIntl) {
      const intlOpts = Object.assign({}, this.opts);
      if (z) {
        intlOpts.timeZone = z;
      }
      this.dtf = getCachedDTF(intl, intlOpts);
    }
  }

  format() {
    if (this.hasIntl) {
      return this.dtf.format(this.dt.toJSDate());
    } else {
      const tokenFormat = _english_js__WEBPACK_IMPORTED_MODULE_1__["formatString"](this.opts),
        loc = Locale.create("en-US");
      return _formatter_js__WEBPACK_IMPORTED_MODULE_4__["default"].create(loc).formatDateTimeFromString(this.dt, tokenFormat);
    }
  }

  formatToParts() {
    if (this.hasIntl && Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasFormatToParts"])()) {
      return this.dtf.formatToParts(this.dt.toJSDate());
    } else {
      // This is kind of a cop out. We actually could do this for English. However, we couldn't do it for intl strings
      // and IMO it's too weird to have an uncanny valley like that
      return [];
    }
  }

  resolvedOptions() {
    if (this.hasIntl) {
      return this.dtf.resolvedOptions();
    } else {
      return {
        locale: "en-US",
        numberingSystem: "latn",
        outputCalendar: "gregory"
      };
    }
  }
}

/**
 * @private
 */
class PolyRelFormatter {
  constructor(intl, isEnglish, opts) {
    this.opts = Object.assign({ style: "long" }, opts);
    if (!isEnglish && Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasRelative"])()) {
      this.rtf = getCachedRTF(intl, opts);
    }
  }

  format(count, unit) {
    if (this.rtf) {
      return this.rtf.format(count, unit);
    } else {
      return _english_js__WEBPACK_IMPORTED_MODULE_1__["formatRelativeTime"](unit, count, this.opts.numeric, this.opts.style !== "long");
    }
  }

  formatToParts(count, unit) {
    if (this.rtf) {
      return this.rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  }
}

/**
 * @private
 */

class Locale {
  static fromOpts(opts) {
    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
  }

  static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
    const specifiedLocale = locale || _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultLocale,
      // the system locale is useful for human readable strings but annoying for parsing/formatting known formats
      localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale()),
      numberingSystemR = numberingSystem || _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultNumberingSystem,
      outputCalendarR = outputCalendar || _settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].defaultOutputCalendar;
    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
  }

  static resetCache() {
    sysLocaleCache = null;
    intlDTCache = {};
    intlNumCache = {};
    intlRelCache = {};
  }

  static fromObject({ locale, numberingSystem, outputCalendar } = {}) {
    return Locale.create(locale, numberingSystem, outputCalendar);
  }

  constructor(locale, numbering, outputCalendar, specifiedLocale) {
    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);

    this.locale = parsedLocale;
    this.numberingSystem = numbering || parsedNumberingSystem || null;
    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);

    this.weekdaysCache = { format: {}, standalone: {} };
    this.monthsCache = { format: {}, standalone: {} };
    this.meridiemCache = null;
    this.eraCache = {};

    this.specifiedLocale = specifiedLocale;
    this.fastNumbersCached = null;
  }

  get fastNumbers() {
    if (this.fastNumbersCached == null) {
      this.fastNumbersCached = supportsFastNumbers(this);
    }

    return this.fastNumbersCached;
  }

  listingMode(defaultOK = true) {
    const intl = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasIntl"])(),
      hasFTP = intl && Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasFormatToParts"])(),
      isActuallyEn = this.isEnglish(),
      hasNoWeirdness =
        (this.numberingSystem === null || this.numberingSystem === "latn") &&
        (this.outputCalendar === null || this.outputCalendar === "gregory");

    if (!hasFTP && !(isActuallyEn && hasNoWeirdness) && !defaultOK) {
      return "error";
    } else if (!hasFTP || (isActuallyEn && hasNoWeirdness)) {
      return "en";
    } else {
      return "intl";
    }
  }

  clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return Locale.create(
        alts.locale || this.specifiedLocale,
        alts.numberingSystem || this.numberingSystem,
        alts.outputCalendar || this.outputCalendar,
        alts.defaultToEN || false
      );
    }
  }

  redefaultToEN(alts = {}) {
    return this.clone(Object.assign({}, alts, { defaultToEN: true }));
  }

  redefaultToSystem(alts = {}) {
    return this.clone(Object.assign({}, alts, { defaultToEN: false }));
  }

  months(length, format = false, defaultOK = true) {
    return listStuff(this, length, defaultOK, _english_js__WEBPACK_IMPORTED_MODULE_1__["months"], () => {
      const intl = format ? { month: length, day: "numeric" } : { month: length },
        formatStr = format ? "format" : "standalone";
      if (!this.monthsCache[formatStr][length]) {
        this.monthsCache[formatStr][length] = mapMonths(dt => this.extract(dt, intl, "month"));
      }
      return this.monthsCache[formatStr][length];
    });
  }

  weekdays(length, format = false, defaultOK = true) {
    return listStuff(this, length, defaultOK, _english_js__WEBPACK_IMPORTED_MODULE_1__["weekdays"], () => {
      const intl = format
          ? { weekday: length, year: "numeric", month: "long", day: "numeric" }
          : { weekday: length },
        formatStr = format ? "format" : "standalone";
      if (!this.weekdaysCache[formatStr][length]) {
        this.weekdaysCache[formatStr][length] = mapWeekdays(dt =>
          this.extract(dt, intl, "weekday")
        );
      }
      return this.weekdaysCache[formatStr][length];
    });
  }

  meridiems(defaultOK = true) {
    return listStuff(
      this,
      undefined,
      defaultOK,
      () => _english_js__WEBPACK_IMPORTED_MODULE_1__["meridiems"],
      () => {
        // In theory there could be aribitrary day periods. We're gonna assume there are exactly two
        // for AM and PM. This is probably wrong, but it's makes parsing way easier.
        if (!this.meridiemCache) {
          const intl = { hour: "numeric", hour12: true };
          this.meridiemCache = [_datetime_js__WEBPACK_IMPORTED_MODULE_3__["default"].utc(2016, 11, 13, 9), _datetime_js__WEBPACK_IMPORTED_MODULE_3__["default"].utc(2016, 11, 13, 19)].map(
            dt => this.extract(dt, intl, "dayperiod")
          );
        }

        return this.meridiemCache;
      }
    );
  }

  eras(length, defaultOK = true) {
    return listStuff(this, length, defaultOK, _english_js__WEBPACK_IMPORTED_MODULE_1__["eras"], () => {
      const intl = { era: length };

      // This is utter bullshit. Different calendars are going to define eras totally differently. What I need is the minimum set of dates
      // to definitely enumerate them.
      if (!this.eraCache[length]) {
        this.eraCache[length] = [_datetime_js__WEBPACK_IMPORTED_MODULE_3__["default"].utc(-40, 1, 1), _datetime_js__WEBPACK_IMPORTED_MODULE_3__["default"].utc(2017, 1, 1)].map(dt =>
          this.extract(dt, intl, "era")
        );
      }

      return this.eraCache[length];
    });
  }

  extract(dt, intlOpts, field) {
    const df = this.dtFormatter(dt, intlOpts),
      results = df.formatToParts(),
      matching = results.find(m => m.type.toLowerCase() === field);
    return matching ? matching.value : null;
  }

  numberFormatter(opts = {}) {
    // this forcesimple option is never used (the only caller short-circuits on it, but it seems safer to leave)
    // (in contrast, the rest of the condition is used heavily)
    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
  }

  dtFormatter(dt, intlOpts = {}) {
    return new PolyDateFormatter(dt, this.intl, intlOpts);
  }

  relFormatter(opts = {}) {
    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
  }

  isEnglish() {
    return (
      this.locale === "en" ||
      this.locale.toLowerCase() === "en-us" ||
      (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasIntl"])() && new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us"))
    );
  }

  equals(other) {
    return (
      this.locale === other.locale &&
      this.numberingSystem === other.numberingSystem &&
      this.outputCalendar === other.outputCalendar
    );
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/impl/regexParser.js":
/*!****************************************************!*\
  !*** ./node_modules/luxon/src/impl/regexParser.js ***!
  \****************************************************/
/*! exports provided: parseISODate, parseRFC2822Date, parseHTTPDate, parseISODuration, parseSQL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseISODate", function() { return parseISODate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseRFC2822Date", function() { return parseRFC2822Date; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHTTPDate", function() { return parseHTTPDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseISODuration", function() { return parseISODuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSQL", function() { return parseSQL; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/luxon/src/impl/util.js");
/* harmony import */ var _english_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./english.js */ "./node_modules/luxon/src/impl/english.js");
/* harmony import */ var _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../zones/fixedOffsetZone.js */ "./node_modules/luxon/src/zones/fixedOffsetZone.js");
/* harmony import */ var _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../zones/IANAZone.js */ "./node_modules/luxon/src/zones/IANAZone.js");





/*
 * This file handles parsing for well-specified formats. Here's how it works:
 * Two things go into parsing: a regex to match with and an extractor to take apart the groups in the match.
 * An extractor is just a function that takes a regex match array and returns a { year: ..., month: ... } object
 * parse() does the work of executing the regex and applying the extractor. It takes multiple regex/extractor pairs to try in sequence.
 * Extractors can take a "cursor" representing the offset in the match to look at. This makes it easy to combine extractors.
 * combineExtractors() does the work of combining them, keeping track of the cursor through multiple extractions.
 * Some extractions are super dumb and simpleParse and fromStrings help DRY them.
 */

function combineRegexes(...regexes) {
  const full = regexes.reduce((f, r) => f + r.source, "");
  return RegExp(`^${full}$`);
}

function combineExtractors(...extractors) {
  return m =>
    extractors
      .reduce(
        ([mergedVals, mergedZone, cursor], ex) => {
          const [val, zone, next] = ex(m, cursor);
          return [Object.assign(mergedVals, val), mergedZone || zone, next];
        },
        [{}, null, 1]
      )
      .slice(0, 2);
}

function parse(s, ...patterns) {
  if (s == null) {
    return [null, null];
  }

  for (const [regex, extractor] of patterns) {
    const m = regex.exec(s);
    if (m) {
      return extractor(m);
    }
  }
  return [null, null];
}

function simpleParse(...keys) {
  return (match, cursor) => {
    const ret = {};
    let i;

    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(match[cursor + i]);
    }
    return [ret, null, cursor + i];
  };
}

// ISO and SQL parsing
const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
  isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,9}))?)?)?/,
  isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${offsetRegex.source}?`),
  isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`),
  isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
  isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/,
  isoOrdinalRegex = /(\d{4})-?(\d{3})/,
  extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay"),
  extractISOOrdinalData = simpleParse("year", "ordinal"),
  sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/, // dumbed-down version of the ISO one
  sqlTimeRegex = RegExp(
    `${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${_util_js__WEBPACK_IMPORTED_MODULE_0__["ianaRegex"].source}))?`
  ),
  sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);

function int(match, pos, fallback) {
  const m = match[pos];
  return Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(m) ? fallback : Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(m);
}

function extractISOYmd(match, cursor) {
  const item = {
    year: int(match, cursor),
    month: int(match, cursor + 1, 1),
    day: int(match, cursor + 2, 1)
  };

  return [item, null, cursor + 3];
}

function extractISOTime(match, cursor) {
  const item = {
    hour: int(match, cursor, 0),
    minute: int(match, cursor + 1, 0),
    second: int(match, cursor + 2, 0),
    millisecond: Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseMillis"])(match[cursor + 3])
  };

  return [item, null, cursor + 4];
}

function extractISOOffset(match, cursor) {
  const local = !match[cursor] && !match[cursor + 1],
    fullOffset = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["signedOffset"])(match[cursor + 1], match[cursor + 2]),
    zone = local ? null : _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__["default"].instance(fullOffset);
  return [{}, zone, cursor + 3];
}

function extractIANAZone(match, cursor) {
  const zone = match[cursor] ? _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_3__["default"].create(match[cursor]) : null;
  return [{}, zone, cursor + 1];
}

// ISO duration parsing

const isoDuration = /^-?P(?:(?:(-?\d{1,9})Y)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})W)?(?:(-?\d{1,9})D)?(?:T(?:(-?\d{1,9})H)?(?:(-?\d{1,9})M)?(?:(-?\d{1,9})(?:[.,](-?\d{1,9}))?S)?)?)$/;

function extractISODuration(match) {
  const [
    s,
    yearStr,
    monthStr,
    weekStr,
    dayStr,
    hourStr,
    minuteStr,
    secondStr,
    millisecondsStr
  ] = match;

  const hasNegativePrefix = s[0] === "-";

  const maybeNegate = num => (num && hasNegativePrefix ? -num : num);

  return [
    {
      years: maybeNegate(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(yearStr)),
      months: maybeNegate(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(monthStr)),
      weeks: maybeNegate(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(weekStr)),
      days: maybeNegate(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(dayStr)),
      hours: maybeNegate(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(hourStr)),
      minutes: maybeNegate(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(minuteStr)),
      seconds: maybeNegate(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(secondStr)),
      milliseconds: maybeNegate(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseMillis"])(millisecondsStr))
    }
  ];
}

// These are a little braindead. EDT *should* tell us that we're in, say, America/New_York
// and not just that we're in -240 *right now*. But since I don't think these are used that often
// I'm just going to ignore that
const obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};

function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  const result = {
    year: yearStr.length === 2 ? Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["untruncateYear"])(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(yearStr)) : Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(yearStr),
    month: _english_js__WEBPACK_IMPORTED_MODULE_1__["monthsShort"].indexOf(monthStr) + 1,
    day: Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(dayStr),
    hour: Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(hourStr),
    minute: Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(minuteStr)
  };

  if (secondStr) result.second = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseInteger"])(secondStr);
  if (weekdayStr) {
    result.weekday =
      weekdayStr.length > 3
        ? _english_js__WEBPACK_IMPORTED_MODULE_1__["weekdaysLong"].indexOf(weekdayStr) + 1
        : _english_js__WEBPACK_IMPORTED_MODULE_1__["weekdaysShort"].indexOf(weekdayStr) + 1;
  }

  return result;
}

// RFC 2822/5322
const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;

function extractRFC2822(match) {
  const [
      ,
      weekdayStr,
      dayStr,
      monthStr,
      yearStr,
      hourStr,
      minuteStr,
      secondStr,
      obsOffset,
      milOffset,
      offHourStr,
      offMinuteStr
    ] = match,
    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);

  let offset;
  if (obsOffset) {
    offset = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset = 0;
  } else {
    offset = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["signedOffset"])(offHourStr, offMinuteStr);
  }

  return [result, new _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__["default"](offset)];
}

function preprocessRFC2822(s) {
  // Remove comments and folding whitespace and replace multiple-spaces with a single space
  return s
    .replace(/\([^)]*\)|[\n\t]/g, " ")
    .replace(/(\s\s+)/g, " ")
    .trim();
}

// http date

const rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
  rfc850 = /^(Monday|Tuesday|Wedsday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
  ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;

function extractRFC1123Or850(match) {
  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match,
    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__["default"].utcInstance];
}

function extractASCII(match) {
  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match,
    result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__["default"].utcInstance];
}

const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);

const extractISOYmdTimeAndOffset = combineExtractors(
  extractISOYmd,
  extractISOTime,
  extractISOOffset
);
const extractISOWeekTimeAndOffset = combineExtractors(
  extractISOWeekData,
  extractISOTime,
  extractISOOffset
);
const extractISOOrdinalDataAndTime = combineExtractors(extractISOOrdinalData, extractISOTime);
const extractISOTimeAndOffset = combineExtractors(extractISOTime, extractISOOffset);

/**
 * @private
 */

function parseISODate(s) {
  return parse(
    s,
    [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
    [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset],
    [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDataAndTime],
    [isoTimeCombinedRegex, extractISOTimeAndOffset]
  );
}

function parseRFC2822Date(s) {
  return parse(preprocessRFC2822(s), [rfc2822, extractRFC2822]);
}

function parseHTTPDate(s) {
  return parse(
    s,
    [rfc1123, extractRFC1123Or850],
    [rfc850, extractRFC1123Or850],
    [ascii, extractASCII]
  );
}

function parseISODuration(s) {
  return parse(s, [isoDuration, extractISODuration]);
}

const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);

const extractISOYmdTimeOffsetAndIANAZone = combineExtractors(
  extractISOYmd,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
const extractISOTimeOffsetAndIANAZone = combineExtractors(
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);

function parseSQL(s) {
  return parse(
    s,
    [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeOffsetAndIANAZone],
    [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]
  );
}


/***/ }),

/***/ "./node_modules/luxon/src/impl/tokenParser.js":
/*!****************************************************!*\
  !*** ./node_modules/luxon/src/impl/tokenParser.js ***!
  \****************************************************/
/*! exports provided: explainFromTokens, parseFromTokens */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "explainFromTokens", function() { return explainFromTokens; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseFromTokens", function() { return parseFromTokens; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/luxon/src/impl/util.js");
/* harmony import */ var _formatter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatter.js */ "./node_modules/luxon/src/impl/formatter.js");
/* harmony import */ var _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../zones/fixedOffsetZone.js */ "./node_modules/luxon/src/zones/fixedOffsetZone.js");
/* harmony import */ var _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../zones/IANAZone.js */ "./node_modules/luxon/src/zones/IANAZone.js");
/* harmony import */ var _datetime_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../datetime.js */ "./node_modules/luxon/src/datetime.js");
/* harmony import */ var _digits_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./digits.js */ "./node_modules/luxon/src/impl/digits.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../errors.js */ "./node_modules/luxon/src/errors.js");








const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";

function intUnit(regex, post = i => i) {
  return { regex, deser: ([s]) => post(Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["parseDigits"])(s)) };
}

function fixListRegex(s) {
  // make dots optional and also make them literal
  return s.replace(/\./, "\\.?");
}

function stripInsensitivities(s) {
  return s.replace(/\./, "").toLowerCase();
}

function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join("|")),
      deser: ([s]) =>
        strings.findIndex(i => stripInsensitivities(s) === stripInsensitivities(i)) + startIndex
    };
  }
}

function offset(regex, groups) {
  return { regex, deser: ([, h, m]) => Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["signedOffset"])(h, m), groups };
}

function simple(regex) {
  return { regex, deser: ([s]) => s };
}

function escapeToken(value) {
  // eslint-disable-next-line no-useless-escape
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}

function unitForToken(token, loc) {
  const one = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc),
    two = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc, "{2}"),
    three = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc, "{3}"),
    four = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc, "{4}"),
    six = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc, "{6}"),
    oneOrTwo = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc, "{1,2}"),
    oneToThree = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc, "{1,3}"),
    oneToSix = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc, "{1,6}"),
    oneToNine = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc, "{1,9}"),
    twoToFour = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc, "{2,4}"),
    fourToSix = Object(_digits_js__WEBPACK_IMPORTED_MODULE_5__["digitRegex"])(loc, "{4,6}"),
    literal = t => ({ regex: RegExp(escapeToken(t.val)), deser: ([s]) => s, literal: true }),
    unitate = t => {
      if (token.literal) {
        return literal(t);
      }
      switch (t.val) {
        // era
        case "G":
          return oneOf(loc.eras("short", false), 0);
        case "GG":
          return oneOf(loc.eras("long", false), 0);
        // years
        case "y":
          return intUnit(oneToSix);
        case "yy":
          return intUnit(twoToFour, _util_js__WEBPACK_IMPORTED_MODULE_0__["untruncateYear"]);
        case "yyyy":
          return intUnit(four);
        case "yyyyy":
          return intUnit(fourToSix);
        case "yyyyyy":
          return intUnit(six);
        // months
        case "M":
          return intUnit(oneOrTwo);
        case "MM":
          return intUnit(two);
        case "MMM":
          return oneOf(loc.months("short", true, false), 1);
        case "MMMM":
          return oneOf(loc.months("long", true, false), 1);
        case "L":
          return intUnit(oneOrTwo);
        case "LL":
          return intUnit(two);
        case "LLL":
          return oneOf(loc.months("short", false, false), 1);
        case "LLLL":
          return oneOf(loc.months("long", false, false), 1);
        // dates
        case "d":
          return intUnit(oneOrTwo);
        case "dd":
          return intUnit(two);
        // ordinals
        case "o":
          return intUnit(oneToThree);
        case "ooo":
          return intUnit(three);
        // time
        case "HH":
          return intUnit(two);
        case "H":
          return intUnit(oneOrTwo);
        case "hh":
          return intUnit(two);
        case "h":
          return intUnit(oneOrTwo);
        case "mm":
          return intUnit(two);
        case "m":
          return intUnit(oneOrTwo);
        case "q":
          return intUnit(oneOrTwo);
        case "qq":
          return intUnit(two);
        case "s":
          return intUnit(oneOrTwo);
        case "ss":
          return intUnit(two);
        case "S":
          return intUnit(oneToThree);
        case "SSS":
          return intUnit(three);
        case "u":
          return simple(oneToNine);
        // meridiem
        case "a":
          return oneOf(loc.meridiems(), 0);
        // weekYear (k)
        case "kkkk":
          return intUnit(four);
        case "kk":
          return intUnit(twoToFour, _util_js__WEBPACK_IMPORTED_MODULE_0__["untruncateYear"]);
        // weekNumber (W)
        case "W":
          return intUnit(oneOrTwo);
        case "WW":
          return intUnit(two);
        // weekdays
        case "E":
        case "c":
          return intUnit(one);
        case "EEE":
          return oneOf(loc.weekdays("short", false, false), 1);
        case "EEEE":
          return oneOf(loc.weekdays("long", false, false), 1);
        case "ccc":
          return oneOf(loc.weekdays("short", true, false), 1);
        case "cccc":
          return oneOf(loc.weekdays("long", true, false), 1);
        // offset/zone
        case "Z":
        case "ZZ":
          return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
        case "ZZZ":
          return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
        // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
        // because we don't have any way to figure out what they are
        case "z":
          return simple(/[a-z_+-/]{1,256}?/i);
        default:
          return literal(t);
      }
    };

  const unit = unitate(token) || {
    invalidReason: MISSING_FTP
  };

  unit.token = token;

  return unit;
}

const partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour: {
    numeric: "h",
    "2-digit": "hh"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  }
};

function tokenForPart(part, locale, formatOpts) {
  const { type, value } = part;

  if (type === "literal") {
    return {
      literal: true,
      val: value
    };
  }

  const style = formatOpts[type];

  let val = partTypeStyleToTokenVal[type];
  if (typeof val === "object") {
    val = val[style];
  }

  if (val) {
    return {
      literal: false,
      val
    };
  }

  return undefined;
}

function buildRegex(units) {
  const re = units.map(u => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
  return [`^${re}$`, units];
}

function match(input, regex, handlers) {
  const matches = input.match(regex);

  if (matches) {
    const all = {};
    let matchIndex = 1;
    for (const i in handlers) {
      if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasOwnProperty"])(handlers, i)) {
        const h = handlers[i],
          groups = h.groups ? h.groups + 1 : 1;
        if (!h.literal && h.token) {
          all[h.token.val[0]] = h.deser(matches.slice(matchIndex, matchIndex + groups));
        }
        matchIndex += groups;
      }
    }
    return [matches, all];
  } else {
    return [matches, {}];
  }
}

function dateTimeFromMatches(matches) {
  const toField = token => {
    switch (token) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };

  let zone;
  if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(matches.Z)) {
    zone = new _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__["default"](matches.Z);
  } else if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(matches.z)) {
    zone = _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_3__["default"].create(matches.z);
  } else {
    zone = null;
  }

  if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }

  if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }

  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }

  if (!Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(matches.u)) {
    matches.S = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["parseMillis"])(matches.u);
  }

  const vals = Object.keys(matches).reduce((r, k) => {
    const f = toField(k);
    if (f) {
      r[f] = matches[k];
    }

    return r;
  }, {});

  return [vals, zone];
}

let dummyDateTimeCache = null;

function getDummyDateTime() {
  if (!dummyDateTimeCache) {
    dummyDateTimeCache = _datetime_js__WEBPACK_IMPORTED_MODULE_4__["default"].fromMillis(1555555555555);
  }

  return dummyDateTimeCache;
}

function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }

  const formatOpts = _formatter_js__WEBPACK_IMPORTED_MODULE_1__["default"].macroTokenToFormatOpts(token.val);

  if (!formatOpts) {
    return token;
  }

  const formatter = _formatter_js__WEBPACK_IMPORTED_MODULE_1__["default"].create(locale, formatOpts);
  const parts = formatter.formatDateTimeParts(getDummyDateTime());

  const tokens = parts.map(p => tokenForPart(p, locale, formatOpts));

  if (tokens.includes(undefined)) {
    return token;
  }

  return tokens;
}

function expandMacroTokens(tokens, locale) {
  return Array.prototype.concat(...tokens.map(t => maybeExpandMacroToken(t, locale)));
}

/**
 * @private
 */

function explainFromTokens(locale, input, format) {
  const tokens = expandMacroTokens(_formatter_js__WEBPACK_IMPORTED_MODULE_1__["default"].parseFormat(format), locale),
    units = tokens.map(t => unitForToken(t, locale)),
    disqualifyingUnit = units.find(t => t.invalidReason);

  if (disqualifyingUnit) {
    return { input, tokens, invalidReason: disqualifyingUnit.invalidReason };
  } else {
    const [regexString, handlers] = buildRegex(units),
      regex = RegExp(regexString, "i"),
      [rawMatches, matches] = match(input, regex, handlers),
      [result, zone] = matches ? dateTimeFromMatches(matches) : [null, null];
    if (Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasOwnProperty"])(matches, "a") && Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["hasOwnProperty"])(matches, "H")) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_6__["ConflictingSpecificationError"](
        "Can't include meridiem when specifying 24-hour format"
      );
    }
    return { input, tokens, regex, rawMatches, matches, result, zone };
  }
}

function parseFromTokens(locale, input, format) {
  const { result, zone, invalidReason } = explainFromTokens(locale, input, format);
  return [result, zone, invalidReason];
}


/***/ }),

/***/ "./node_modules/luxon/src/impl/util.js":
/*!*********************************************!*\
  !*** ./node_modules/luxon/src/impl/util.js ***!
  \*********************************************/
/*! exports provided: isUndefined, isNumber, isInteger, isString, isDate, hasIntl, hasFormatToParts, hasRelative, maybeArray, bestBy, pick, hasOwnProperty, integerBetween, floorMod, padStart, parseInteger, parseMillis, roundTo, isLeapYear, daysInYear, daysInMonth, objToLocalTS, weeksInWeekYear, untruncateYear, parseZoneInfo, signedOffset, asNumber, normalizeObject, formatOffset, timeObject, ianaRegex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInteger", function() { return isInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDate", function() { return isDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasIntl", function() { return hasIntl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasFormatToParts", function() { return hasFormatToParts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasRelative", function() { return hasRelative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maybeArray", function() { return maybeArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bestBy", function() { return bestBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return pick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasOwnProperty", function() { return hasOwnProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "integerBetween", function() { return integerBetween; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floorMod", function() { return floorMod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "padStart", function() { return padStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseInteger", function() { return parseInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseMillis", function() { return parseMillis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundTo", function() { return roundTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLeapYear", function() { return isLeapYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daysInYear", function() { return daysInYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "daysInMonth", function() { return daysInMonth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objToLocalTS", function() { return objToLocalTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "weeksInWeekYear", function() { return weeksInWeekYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "untruncateYear", function() { return untruncateYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseZoneInfo", function() { return parseZoneInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signedOffset", function() { return signedOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asNumber", function() { return asNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeObject", function() { return normalizeObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatOffset", function() { return formatOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeObject", function() { return timeObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ianaRegex", function() { return ianaRegex; });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../errors.js */ "./node_modules/luxon/src/errors.js");
/*
  This is just a junk drawer, containing anything used across multiple classes.
  Because Luxon is small(ish), this should stay small and we won't worry about splitting
  it up into, say, parsingUtil.js and basicUtil.js and so on. But they are divided up by feature area.
*/



/**
 * @private
 */

// TYPES

function isUndefined(o) {
  return typeof o === "undefined";
}

function isNumber(o) {
  return typeof o === "number";
}

function isInteger(o) {
  return typeof o === "number" && o % 1 === 0;
}

function isString(o) {
  return typeof o === "string";
}

function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
}

// CAPABILITIES

function hasIntl() {
  try {
    return typeof Intl !== "undefined" && Intl.DateTimeFormat;
  } catch (e) {
    return false;
  }
}

function hasFormatToParts() {
  return !isUndefined(Intl.DateTimeFormat.prototype.formatToParts);
}

function hasRelative() {
  try {
    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return false;
  }
}

// OBJECTS AND ARRAYS

function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}

function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return undefined;
  }
  return arr.reduce((best, next) => {
    const pair = [by(next), next];
    if (!best) {
      return pair;
    } else if (compare(best[0], pair[0]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}

function pick(obj, keys) {
  return keys.reduce((a, k) => {
    a[k] = obj[k];
    return a;
  }, {});
}

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// NUMBERS AND STRINGS

function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
}

// x % n but takes the sign of n instead of x
function floorMod(x, n) {
  return x - n * Math.floor(x / n);
}

function padStart(input, n = 2) {
  if (input.toString().length < n) {
    return ("0".repeat(n) + input).slice(-n);
  } else {
    return input.toString();
  }
}

function parseInteger(string) {
  if (isUndefined(string) || string === null || string === "") {
    return undefined;
  } else {
    return parseInt(string, 10);
  }
}

function parseMillis(fraction) {
  // Return undefined (instead of 0) in these cases, where fraction is not set
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return undefined;
  } else {
    const f = parseFloat("0." + fraction) * 1000;
    return Math.floor(f);
  }
}

function roundTo(number, digits, towardZero = false) {
  const factor = 10 ** digits,
    rounder = towardZero ? Math.trunc : Math.round;
  return rounder(number * factor) / factor;
}

// DATE BASICS

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}

function daysInMonth(year, month) {
  const modMonth = floorMod(month - 1, 12) + 1,
    modYear = year + (month - modMonth) / 12;

  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
}

// covert a calendar object to a local timestamp (epoch, but with the offset baked in)
function objToLocalTS(obj) {
  let d = Date.UTC(
    obj.year,
    obj.month - 1,
    obj.day,
    obj.hour,
    obj.minute,
    obj.second,
    obj.millisecond
  );

  // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that
  if (obj.year < 100 && obj.year >= 0) {
    d = new Date(d);
    d.setUTCFullYear(d.getUTCFullYear() - 1900);
  }
  return +d;
}

function weeksInWeekYear(weekYear) {
  const p1 =
      (weekYear +
        Math.floor(weekYear / 4) -
        Math.floor(weekYear / 100) +
        Math.floor(weekYear / 400)) %
      7,
    last = weekYear - 1,
    p2 = (last + Math.floor(last / 4) - Math.floor(last / 100) + Math.floor(last / 400)) % 7;
  return p1 === 4 || p2 === 3 ? 53 : 52;
}

function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else return year > 60 ? 1900 + year : 2000 + year;
}

// PARSING

function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
  const date = new Date(ts),
    intlOpts = {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };

  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }

  const modified = Object.assign({ timeZoneName: offsetFormat }, intlOpts),
    intl = hasIntl();

  if (intl && hasFormatToParts()) {
    const parsed = new Intl.DateTimeFormat(locale, modified)
      .formatToParts(date)
      .find(m => m.type.toLowerCase() === "timezonename");
    return parsed ? parsed.value : null;
  } else if (intl) {
    // this probably doesn't work for all locales
    const without = new Intl.DateTimeFormat(locale, intlOpts).format(date),
      included = new Intl.DateTimeFormat(locale, modified).format(date),
      diffed = included.substring(without.length),
      trimmed = diffed.replace(/^[, \u200e]+/, "");
    return trimmed;
  } else {
    return null;
  }
}

// signedOffset('-5', '30') -> -330
function signedOffset(offHourStr, offMinuteStr) {
  let offHour = parseInt(offHourStr, 10);

  // don't || this because we want to preserve -0
  if (Number.isNaN(offHour)) {
    offHour = 0;
  }

  const offMin = parseInt(offMinuteStr, 10) || 0,
    offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
}

// COERCION

function asNumber(value) {
  const numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["InvalidArgumentError"](`Invalid unit value ${value}`);
  return numericValue;
}

function normalizeObject(obj, normalizer, nonUnitKeys) {
  const normalized = {};
  for (const u in obj) {
    if (hasOwnProperty(obj, u)) {
      if (nonUnitKeys.indexOf(u) >= 0) continue;
      const v = obj[u];
      if (v === undefined || v === null) continue;
      normalized[normalizer(u)] = asNumber(v);
    }
  }
  return normalized;
}

function formatOffset(offset, format) {
  const hours = Math.trunc(offset / 60),
    minutes = Math.abs(offset % 60),
    sign = hours >= 0 && !Object.is(hours, -0) ? "+" : "-",
    base = `${sign}${Math.abs(hours)}`;

  switch (format) {
    case "short":
      return `${sign}${padStart(Math.abs(hours), 2)}:${padStart(minutes, 2)}`;
    case "narrow":
      return minutes > 0 ? `${base}:${minutes}` : base;
    case "techie":
      return `${sign}${padStart(Math.abs(hours), 2)}${padStart(minutes, 2)}`;
    default:
      throw new RangeError(`Value format ${format} is out of range for property format`);
  }
}

function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}

const ianaRegex = /[A-Za-z_+-]{1,256}(:?\/[A-Za-z_+-]{1,256}(\/[A-Za-z_+-]{1,256})?)?/;


/***/ }),

/***/ "./node_modules/luxon/src/impl/zoneUtil.js":
/*!*************************************************!*\
  !*** ./node_modules/luxon/src/impl/zoneUtil.js ***!
  \*************************************************/
/*! exports provided: normalizeZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeZone", function() { return normalizeZone; });
/* harmony import */ var _zone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../zone.js */ "./node_modules/luxon/src/zone.js");
/* harmony import */ var _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../zones/IANAZone.js */ "./node_modules/luxon/src/zones/IANAZone.js");
/* harmony import */ var _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../zones/fixedOffsetZone.js */ "./node_modules/luxon/src/zones/fixedOffsetZone.js");
/* harmony import */ var _zones_invalidZone_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../zones/invalidZone.js */ "./node_modules/luxon/src/zones/invalidZone.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util.js */ "./node_modules/luxon/src/impl/util.js");
/**
 * @private
 */








function normalizeZone(input, defaultZone) {
  let offset;
  if (Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["isUndefined"])(input) || input === null) {
    return defaultZone;
  } else if (input instanceof _zone_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
    return input;
  } else if (Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["isString"])(input)) {
    const lowered = input.toLowerCase();
    if (lowered === "local") return defaultZone;
    else if (lowered === "utc" || lowered === "gmt") return _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__["default"].utcInstance;
    else if ((offset = _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_1__["default"].parseGMTOffset(input)) != null) {
      // handle Etc/GMT-4, which V8 chokes on
      return _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__["default"].instance(offset);
    } else if (_zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_1__["default"].isValidSpecifier(lowered)) return _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_1__["default"].create(input);
    else return _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__["default"].parseSpecifier(lowered) || new _zones_invalidZone_js__WEBPACK_IMPORTED_MODULE_3__["default"](input);
  } else if (Object(_util_js__WEBPACK_IMPORTED_MODULE_4__["isNumber"])(input)) {
    return _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_2__["default"].instance(input);
  } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
    // This is dumb, but the instanceof check above doesn't seem to really work
    // so we're duck checking it
    return input;
  } else {
    return new _zones_invalidZone_js__WEBPACK_IMPORTED_MODULE_3__["default"](input);
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/info.js":
/*!****************************************!*\
  !*** ./node_modules/luxon/src/info.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Info; });
/* harmony import */ var _datetime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime.js */ "./node_modules/luxon/src/datetime.js");
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings.js */ "./node_modules/luxon/src/settings.js");
/* harmony import */ var _impl_locale_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./impl/locale.js */ "./node_modules/luxon/src/impl/locale.js");
/* harmony import */ var _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./zones/IANAZone.js */ "./node_modules/luxon/src/zones/IANAZone.js");
/* harmony import */ var _impl_zoneUtil_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./impl/zoneUtil.js */ "./node_modules/luxon/src/impl/zoneUtil.js");
/* harmony import */ var _impl_util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./impl/util.js */ "./node_modules/luxon/src/impl/util.js");








/**
 * The Info class contains static methods for retrieving general time and date related data. For example, it has methods for finding out if a time zone has a DST, for listing the months in any supported locale, and for discovering which of Luxon features are available in the current environment.
 */
class Info {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(zone = _settings_js__WEBPACK_IMPORTED_MODULE_1__["default"].defaultZone) {
    const proto = _datetime_js__WEBPACK_IMPORTED_MODULE_0__["default"].local()
      .setZone(zone)
      .set({ month: 12 });

    return !zone.universal && proto.offset !== proto.set({ month: 6 }).offset;
  }

  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(zone) {
    return _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_3__["default"].isValidSpecifier(zone) && _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_3__["default"].isValidZone(zone);
  }

  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone.isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(input) {
    return Object(_impl_zoneUtil_js__WEBPACK_IMPORTED_MODULE_4__["normalizeZone"])(input, _settings_js__WEBPACK_IMPORTED_MODULE_1__["default"].defaultZone);
  }

  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {[string]}
   */
  static months(
    length = "long",
    { locale = null, numberingSystem = null, outputCalendar = "gregory" } = {}
  ) {
    return _impl_locale_js__WEBPACK_IMPORTED_MODULE_2__["default"].create(locale, numberingSystem, outputCalendar).months(length);
  }

  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {[string]}
   */
  static monthsFormat(
    length = "long",
    { locale = null, numberingSystem = null, outputCalendar = "gregory" } = {}
  ) {
    return _impl_locale_js__WEBPACK_IMPORTED_MODULE_2__["default"].create(locale, numberingSystem, outputCalendar).months(length, true);
  }

  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {[string]}
   */
  static weekdays(length = "long", { locale = null, numberingSystem = null } = {}) {
    return _impl_locale_js__WEBPACK_IMPORTED_MODULE_2__["default"].create(locale, numberingSystem, null).weekdays(length);
  }

  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @return {[string]}
   */
  static weekdaysFormat(length = "long", { locale = null, numberingSystem = null } = {}) {
    return _impl_locale_js__WEBPACK_IMPORTED_MODULE_2__["default"].create(locale, numberingSystem, null).weekdays(length, true);
  }

  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {[string]}
   */
  static meridiems({ locale = null } = {}) {
    return _impl_locale_js__WEBPACK_IMPORTED_MODULE_2__["default"].create(locale).meridiems();
  }

  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {[string]}
   */
  static eras(length = "short", { locale = null } = {}) {
    return _impl_locale_js__WEBPACK_IMPORTED_MODULE_2__["default"].create(locale, null, "gregory").eras(length);
  }

  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, timezone support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `zones`: whether this environment supports IANA timezones
   * * `intlTokens`: whether this environment supports internationalized token-based formatting/parsing
   * * `intl`: whether this environment supports general internationalization
   * * `relative`: whether this environment supports relative time formatting
   * @example Info.features() //=> { intl: true, intlTokens: false, zones: true, relative: false }
   * @return {Object}
   */
  static features() {
    let intl = false,
      intlTokens = false,
      zones = false,
      relative = false;

    if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["hasIntl"])()) {
      intl = true;
      intlTokens = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["hasFormatToParts"])();
      relative = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_5__["hasRelative"])();

      try {
        zones =
          new Intl.DateTimeFormat("en", { timeZone: "America/New_York" }).resolvedOptions()
            .timeZone === "America/New_York";
      } catch (e) {
        zones = false;
      }
    }

    return { intl, intlTokens, zones, relative };
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/interval.js":
/*!********************************************!*\
  !*** ./node_modules/luxon/src/interval.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Interval; });
/* harmony import */ var _datetime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime.js */ "./node_modules/luxon/src/datetime.js");
/* harmony import */ var _duration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./duration.js */ "./node_modules/luxon/src/duration.js");
/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings.js */ "./node_modules/luxon/src/settings.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./errors.js */ "./node_modules/luxon/src/errors.js");
/* harmony import */ var _impl_invalid_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./impl/invalid.js */ "./node_modules/luxon/src/impl/invalid.js");






const INVALID = "Invalid Interval";

// checks if the start is equal to or before the end
function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid(
      "end before start",
      `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`
    );
  } else {
    return null;
  }
}

/**
 * An Interval object represents a half-open interval of time, where each endpoint is a {@link DateTime}. Conceptually, it's a container for those two endpoints, accompanied by methods for creating, parsing, interrogating, comparing, transforming, and formatting them.
 *
 * Here is a brief overview of the most commonly used methods and getters in Interval:
 *
 * * **Creation** To create an Interval, use {@link fromDateTimes}, {@link after}, {@link before}, or {@link fromISO}.
 * * **Accessors** Use {@link start} and {@link end} to get the start and end.
 * * **Interrogation** To analyze the Interval, use {@link count}, {@link length}, {@link hasSame}, {@link contains}, {@link isAfter}, or {@link isBefore}.
 * * **Transformation** To create other Intervals out of this one, use {@link set}, {@link splitAt}, {@link splitBy}, {@link divideEqually}, {@link merge}, {@link xor}, {@link union}, {@link intersection}, or {@link difference}.
 * * **Comparison** To compare this Interval to another one, use {@link equals}, {@link overlaps}, {@link abutsStart}, {@link abutsEnd}, {@link engulfs}
 * * **Output** To convert the Interval into other representations, see {@link toString}, {@link toISO}, {@link toISODate}, {@link toISOTime}, {@link toFormat}, and {@link toDuration}.
 */
class Interval {
  /**
   * @private
   */
  constructor(config) {
    /**
     * @access private
     */
    this.s = config.start;
    /**
     * @access private
     */
    this.e = config.end;
    /**
     * @access private
     */
    this.invalid = config.invalid || null;
    /**
     * @access private
     */
    this.isLuxonInterval = true;
  }

  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_3__["InvalidArgumentError"]("need to specify a reason the Interval is invalid");
    }

    const invalid = reason instanceof _impl_invalid_js__WEBPACK_IMPORTED_MODULE_4__["default"] ? reason : new _impl_invalid_js__WEBPACK_IMPORTED_MODULE_4__["default"](reason, explanation);

    if (_settings_js__WEBPACK_IMPORTED_MODULE_2__["default"].throwOnInvalid) {
      throw new _errors_js__WEBPACK_IMPORTED_MODULE_3__["InvalidIntervalError"](invalid);
    } else {
      return new Interval({ invalid });
    }
  }

  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(start, end) {
    const builtStart = Object(_datetime_js__WEBPACK_IMPORTED_MODULE_0__["friendlyDateTime"])(start),
      builtEnd = Object(_datetime_js__WEBPACK_IMPORTED_MODULE_0__["friendlyDateTime"])(end);

    const validateError = validateStartEnd(builtStart, builtEnd);

    if (validateError == null) {
      return new Interval({
        start: builtStart,
        end: builtEnd
      });
    } else {
      return validateError;
    }
  }

  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(start, duration) {
    const dur = Object(_duration_js__WEBPACK_IMPORTED_MODULE_1__["friendlyDuration"])(duration),
      dt = Object(_datetime_js__WEBPACK_IMPORTED_MODULE_0__["friendlyDateTime"])(start);
    return Interval.fromDateTimes(dt, dt.plus(dur));
  }

  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(end, duration) {
    const dur = Object(_duration_js__WEBPACK_IMPORTED_MODULE_1__["friendlyDuration"])(duration),
      dt = Object(_datetime_js__WEBPACK_IMPORTED_MODULE_0__["friendlyDateTime"])(end);
    return Interval.fromDateTimes(dt.minus(dur), dt);
  }

  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime.fromISO} and optionally {@link Duration.fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(text, opts) {
    const [s, e] = (text || "").split("/", 2);
    if (s && e) {
      const start = _datetime_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromISO(s, opts),
        end = _datetime_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromISO(e, opts);

      if (start.isValid && end.isValid) {
        return Interval.fromDateTimes(start, end);
      }

      if (start.isValid) {
        const dur = _duration_js__WEBPACK_IMPORTED_MODULE_1__["default"].fromISO(e, opts);
        if (dur.isValid) {
          return Interval.after(start, dur);
        }
      } else if (end.isValid) {
        const dur = _duration_js__WEBPACK_IMPORTED_MODULE_1__["default"].fromISO(s, opts);
        if (dur.isValid) {
          return Interval.before(end, dur);
        }
      }
    }
    return Interval.invalid("unparsable", `the input "${text}" can't be parsed as ISO 8601`);
  }

  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(o) {
    return (o && o.isLuxonInterval) || false;
  }

  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }

  /**
   * Returns the end of the Interval
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }

  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }

  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }

  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }

  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(unit = "milliseconds") {
    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
  }

  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @return {number}
   */
  count(unit = "milliseconds") {
    if (!this.isValid) return NaN;
    const start = this.start.startOf(unit),
      end = this.end.startOf(unit);
    return Math.floor(end.diff(start, unit).get(unit)) + 1;
  }

  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(unit) {
    return this.isValid ? this.e.minus(1).hasSame(this.s, unit) : false;
  }

  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }

  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(dateTime) {
    if (!this.isValid) return false;
    return this.s > dateTime;
  }

  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(dateTime) {
    if (!this.isValid) return false;
    return this.e <= dateTime;
  }

  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(dateTime) {
    if (!this.isValid) return false;
    return this.s <= dateTime && this.e > dateTime;
  }

  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start, end } = {}) {
    if (!this.isValid) return this;
    return Interval.fromDateTimes(start || this.s, end || this.e);
  }

  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...[DateTime]} dateTimes - the unit of time to count.
   * @return {[Interval]}
   */
  splitAt(...dateTimes) {
    if (!this.isValid) return [];
    const sorted = dateTimes
        .map(_datetime_js__WEBPACK_IMPORTED_MODULE_0__["friendlyDateTime"])
        .filter(d => this.contains(d))
        .sort(),
      results = [];
    let { s } = this,
      i = 0;

    while (s < this.e) {
      const added = sorted[i] || this.e,
        next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
      i += 1;
    }

    return results;
  }

  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {[Interval]}
   */
  splitBy(duration) {
    const dur = Object(_duration_js__WEBPACK_IMPORTED_MODULE_1__["friendlyDuration"])(duration);

    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }

    let { s } = this,
      added,
      next;

    const results = [];
    while (s < this.e) {
      added = s.plus(dur);
      next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s, next));
      s = next;
    }

    return results;
  }

  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {[Interval]}
   */
  divideEqually(numberOfParts) {
    if (!this.isValid) return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  }

  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(other) {
    return this.e > other.s && this.s < other.e;
  }

  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(other) {
    if (!this.isValid) return false;
    return +this.e === +other.s;
  }

  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(other) {
    if (!this.isValid) return false;
    return +other.e === +this.s;
  }

  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(other) {
    if (!this.isValid) return false;
    return this.s <= other.s && this.e >= other.e;
  }

  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }

    return this.s.equals(other.s) && this.e.equals(other.e);
  }

  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(other) {
    if (!this.isValid) return this;
    const s = this.s > other.s ? this.s : other.s,
      e = this.e < other.e ? this.e : other.e;

    if (s > e) {
      return null;
    } else {
      return Interval.fromDateTimes(s, e);
    }
  }

  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(other) {
    if (!this.isValid) return this;
    const s = this.s < other.s ? this.s : other.s,
      e = this.e > other.e ? this.e : other.e;
    return Interval.fromDateTimes(s, e);
  }

  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {[Interval]} intervals
   * @return {[Interval]}
   */
  static merge(intervals) {
    const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(
      ([sofar, current], item) => {
        if (!current) {
          return [sofar, item];
        } else if (current.overlaps(item) || current.abutsStart(item)) {
          return [sofar, current.union(item)];
        } else {
          return [sofar.concat([current]), item];
        }
      },
      [[], null]
    );
    if (final) {
      found.push(final);
    }
    return found;
  }

  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {[Interval]} intervals
   * @return {[Interval]}
   */
  static xor(intervals) {
    let start = null,
      currentCount = 0;
    const results = [],
      ends = intervals.map(i => [{ time: i.s, type: "s" }, { time: i.e, type: "e" }]),
      flattened = Array.prototype.concat(...ends),
      arr = flattened.sort((a, b) => a.time - b.time);

    for (const i of arr) {
      currentCount += i.type === "s" ? 1 : -1;

      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && +start !== +i.time) {
          results.push(Interval.fromDateTimes(start, i.time));
        }

        start = null;
      }
    }

    return Interval.merge(results);
  }

  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {[Interval]}
   */
  difference(...intervals) {
    return Interval.xor([this].concat(intervals))
      .map(i => this.intersection(i))
      .filter(i => i && !i.isEmpty());
  }

  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    if (!this.isValid) return INVALID;
    return `[${this.s.toISO()} – ${this.e.toISO()})`;
  }

  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime.toISO}
   * @return {string}
   */
  toISO(opts) {
    if (!this.isValid) return INVALID;
    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
  }

  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    if (!this.isValid) return INVALID;
    return `${this.s.toISODate()}/${this.e.toISODate()}`;
  }

  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime.toISO}
   * @return {string}
   */
  toISOTime(opts) {
    if (!this.isValid) return INVALID;
    return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
  }

  /**
   * Returns a string representation of this Interval formatted according to the specified format string.
   * @param {string} dateFormat - the format string. This string formats the start and end time. See {@link DateTime.toFormat} for details.
   * @param {Object} opts - options
   * @param {string} [opts.separator =  ' – '] - a separator to place between the start and end representations
   * @return {string}
   */
  toFormat(dateFormat, { separator = " – " } = {}) {
    if (!this.isValid) return INVALID;
    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
  }

  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(unit, opts) {
    if (!this.isValid) {
      return _duration_js__WEBPACK_IMPORTED_MODULE_1__["default"].invalid(this.invalidReason);
    }
    return this.e.diff(this.s, unit, opts);
  }

  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(mapFn) {
    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/luxon.js":
/*!*****************************************!*\
  !*** ./node_modules/luxon/src/luxon.js ***!
  \*****************************************/
/*! exports provided: DateTime, Duration, Interval, Info, Zone, FixedOffsetZone, IANAZone, InvalidZone, LocalZone, Settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _datetime_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime.js */ "./node_modules/luxon/src/datetime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DateTime", function() { return _datetime_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _duration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./duration.js */ "./node_modules/luxon/src/duration.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Duration", function() { return _duration_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _interval_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interval.js */ "./node_modules/luxon/src/interval.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interval", function() { return _interval_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _info_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./info.js */ "./node_modules/luxon/src/info.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Info", function() { return _info_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _zone_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./zone.js */ "./node_modules/luxon/src/zone.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Zone", function() { return _zone_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./zones/fixedOffsetZone.js */ "./node_modules/luxon/src/zones/fixedOffsetZone.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FixedOffsetZone", function() { return _zones_fixedOffsetZone_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./zones/IANAZone.js */ "./node_modules/luxon/src/zones/IANAZone.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IANAZone", function() { return _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _zones_invalidZone_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./zones/invalidZone.js */ "./node_modules/luxon/src/zones/invalidZone.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InvalidZone", function() { return _zones_invalidZone_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _zones_localZone_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./zones/localZone.js */ "./node_modules/luxon/src/zones/localZone.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LocalZone", function() { return _zones_localZone_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _settings_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./settings.js */ "./node_modules/luxon/src/settings.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Settings", function() { return _settings_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });















/***/ }),

/***/ "./node_modules/luxon/src/settings.js":
/*!********************************************!*\
  !*** ./node_modules/luxon/src/settings.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Settings; });
/* harmony import */ var _zones_localZone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zones/localZone.js */ "./node_modules/luxon/src/zones/localZone.js");
/* harmony import */ var _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./zones/IANAZone.js */ "./node_modules/luxon/src/zones/IANAZone.js");
/* harmony import */ var _impl_locale_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./impl/locale.js */ "./node_modules/luxon/src/impl/locale.js");
/* harmony import */ var _impl_zoneUtil_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./impl/zoneUtil.js */ "./node_modules/luxon/src/impl/zoneUtil.js");






let now = () => Date.now(),
  defaultZone = null, // not setting this directly to LocalZone.instance bc loading order issues
  defaultLocale = null,
  defaultNumberingSystem = null,
  defaultOutputCalendar = null,
  throwOnInvalid = false;

/**
 * Settings contains static getters and setters that control Luxon's overall behavior. Luxon is a simple library with few options, but the ones it does have live here.
 */
class Settings {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return now;
  }

  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(n) {
    now = n;
  }

  /**
   * Get the default time zone to create DateTimes in.
   * @type {string}
   */
  static get defaultZoneName() {
    return Settings.defaultZone.name;
  }

  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * @type {string}
   */
  static set defaultZoneName(z) {
    if (!z) {
      defaultZone = null;
    } else {
      defaultZone = Object(_impl_zoneUtil_js__WEBPACK_IMPORTED_MODULE_3__["normalizeZone"])(z);
    }
  }

  /**
   * Get the default time zone object to create DateTimes in. Does not affect existing instances.
   * @type {Zone}
   */
  static get defaultZone() {
    return defaultZone || _zones_localZone_js__WEBPACK_IMPORTED_MODULE_0__["default"].instance;
  }

  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return defaultLocale;
  }

  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(locale) {
    defaultLocale = locale;
  }

  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return defaultNumberingSystem;
  }

  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(numberingSystem) {
    defaultNumberingSystem = numberingSystem;
  }

  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return defaultOutputCalendar;
  }

  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(outputCalendar) {
    defaultOutputCalendar = outputCalendar;
  }

  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return throwOnInvalid;
  }

  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(t) {
    throwOnInvalid = t;
  }

  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    _impl_locale_js__WEBPACK_IMPORTED_MODULE_2__["default"].resetCache();
    _zones_IANAZone_js__WEBPACK_IMPORTED_MODULE_1__["default"].resetCache();
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/zone.js":
/*!****************************************!*\
  !*** ./node_modules/luxon/src/zone.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Zone; });
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors.js */ "./node_modules/luxon/src/errors.js");
/* eslint no-unused-vars: "off" */


/**
 * @interface
 */
class Zone {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["ZoneIsAbstractError"]();
  }

  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["ZoneIsAbstractError"]();
  }

  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get universal() {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["ZoneIsAbstractError"]();
  }

  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(ts, opts) {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["ZoneIsAbstractError"]();
  }

  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(ts, format) {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["ZoneIsAbstractError"]();
  }

  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(ts) {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["ZoneIsAbstractError"]();
  }

  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["ZoneIsAbstractError"]();
  }

  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new _errors_js__WEBPACK_IMPORTED_MODULE_0__["ZoneIsAbstractError"]();
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/zones/IANAZone.js":
/*!**************************************************!*\
  !*** ./node_modules/luxon/src/zones/IANAZone.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IANAZone; });
/* harmony import */ var _impl_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../impl/util.js */ "./node_modules/luxon/src/impl/util.js");
/* harmony import */ var _zone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../zone.js */ "./node_modules/luxon/src/zone.js");



const matchingRegex = RegExp(`^${_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["ianaRegex"].source}$`);

let dtfCache = {};
function makeDTF(zone) {
  if (!dtfCache[zone]) {
    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }
  return dtfCache[zone];
}

const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};

function hackyOffset(dtf, date) {
  const formatted = dtf.format(date).replace(/\u200E/g, ""),
    parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted),
    [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed;
  return [fYear, fMonth, fDay, fHour, fMinute, fSecond];
}

function partsOffset(dtf, date) {
  const formatted = dtf.formatToParts(date),
    filled = [];
  for (let i = 0; i < formatted.length; i++) {
    const { type, value } = formatted[i],
      pos = typeToPos[type];

    if (!Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["isUndefined"])(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }
  return filled;
}

let ianaZoneCache = {};
/**
 * A zone identified by an IANA identifier, like America/New_York
 * @implements {Zone}
 */
class IANAZone extends _zone_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(name) {
    if (!ianaZoneCache[name]) {
      ianaZoneCache[name] = new IANAZone(name);
    }
    return ianaZoneCache[name];
  }

  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    ianaZoneCache = {};
    dtfCache = {};
  }

  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Fantasia/Castle") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidSpecifier(s) {
    return !!(s && s.match(matchingRegex));
  }

  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(zone) {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
      return true;
    } catch (e) {
      return false;
    }
  }

  // Etc/GMT+8 -> -480
  /** @ignore */
  static parseGMTOffset(specifier) {
    if (specifier) {
      const match = specifier.match(/^Etc\/GMT([+-]\d{1,2})$/i);
      if (match) {
        return -60 * parseInt(match[1]);
      }
    }
    return null;
  }

  constructor(name) {
    super();
    /** @private **/
    this.zoneName = name;
    /** @private **/
    this.valid = IANAZone.isValidZone(name);
  }

  /** @override **/
  get type() {
    return "iana";
  }

  /** @override **/
  get name() {
    return this.zoneName;
  }

  /** @override **/
  get universal() {
    return false;
  }

  /** @override **/
  offsetName(ts, { format, locale }) {
    return Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["parseZoneInfo"])(ts, format, locale, this.name);
  }

  /** @override **/
  formatOffset(ts, format) {
    return Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["formatOffset"])(this.offset(ts), format);
  }

  /** @override **/
  offset(ts) {
    const date = new Date(ts),
      dtf = makeDTF(this.name),
      [year, month, day, hour, minute, second] = dtf.formatToParts
        ? partsOffset(dtf, date)
        : hackyOffset(dtf, date),
      // work around https://bugs.chromium.org/p/chromium/issues/detail?id=1025564&can=2&q=%2224%3A00%22%20datetimeformat
      adjustedHour = hour === 24 ? 0 : hour;

    const asUTC = Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["objToLocalTS"])({
      year,
      month,
      day,
      hour: adjustedHour,
      minute,
      second,
      millisecond: 0
    });

    let asTS = +date;
    const over = asTS % 1000;
    asTS -= over >= 0 ? over : 1000 + over;
    return (asUTC - asTS) / (60 * 1000);
  }

  /** @override **/
  equals(otherZone) {
    return otherZone.type === "iana" && otherZone.name === this.name;
  }

  /** @override **/
  get isValid() {
    return this.valid;
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/zones/fixedOffsetZone.js":
/*!*********************************************************!*\
  !*** ./node_modules/luxon/src/zones/fixedOffsetZone.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FixedOffsetZone; });
/* harmony import */ var _impl_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../impl/util.js */ "./node_modules/luxon/src/impl/util.js");
/* harmony import */ var _zone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../zone.js */ "./node_modules/luxon/src/zone.js");



let singleton = null;

/**
 * A zone with a fixed offset (meaning no DST)
 * @implements {Zone}
 */
class FixedOffsetZone extends _zone_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    if (singleton === null) {
      singleton = new FixedOffsetZone(0);
    }
    return singleton;
  }

  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(offset) {
    return offset === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset);
  }

  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(s) {
    if (s) {
      const r = s.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r) {
        return new FixedOffsetZone(Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["signedOffset"])(r[1], r[2]));
      }
    }
    return null;
  }

  constructor(offset) {
    super();
    /** @private **/
    this.fixed = offset;
  }

  /** @override **/
  get type() {
    return "fixed";
  }

  /** @override **/
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["formatOffset"])(this.fixed, "narrow")}`;
  }

  /** @override **/
  offsetName() {
    return this.name;
  }

  /** @override **/
  formatOffset(ts, format) {
    return Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["formatOffset"])(this.fixed, format);
  }

  /** @override **/
  get universal() {
    return true;
  }

  /** @override **/
  offset() {
    return this.fixed;
  }

  /** @override **/
  equals(otherZone) {
    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
  }

  /** @override **/
  get isValid() {
    return true;
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/zones/invalidZone.js":
/*!*****************************************************!*\
  !*** ./node_modules/luxon/src/zones/invalidZone.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return InvalidZone; });
/* harmony import */ var _zone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../zone.js */ "./node_modules/luxon/src/zone.js");


/**
 * A zone that failed to parse. You should never need to instantiate this.
 * @implements {Zone}
 */
class InvalidZone extends _zone_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(zoneName) {
    super();
    /**  @private */
    this.zoneName = zoneName;
  }

  /** @override **/
  get type() {
    return "invalid";
  }

  /** @override **/
  get name() {
    return this.zoneName;
  }

  /** @override **/
  get universal() {
    return false;
  }

  /** @override **/
  offsetName() {
    return null;
  }

  /** @override **/
  formatOffset() {
    return "";
  }

  /** @override **/
  offset() {
    return NaN;
  }

  /** @override **/
  equals() {
    return false;
  }

  /** @override **/
  get isValid() {
    return false;
  }
}


/***/ }),

/***/ "./node_modules/luxon/src/zones/localZone.js":
/*!***************************************************!*\
  !*** ./node_modules/luxon/src/zones/localZone.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalZone; });
/* harmony import */ var _impl_util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../impl/util.js */ "./node_modules/luxon/src/impl/util.js");
/* harmony import */ var _zone_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../zone.js */ "./node_modules/luxon/src/zone.js");



let singleton = null;

/**
 * Represents the local zone for this Javascript environment.
 * @implements {Zone}
 */
class LocalZone extends _zone_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * Get a singleton instance of the local zone
   * @return {LocalZone}
   */
  static get instance() {
    if (singleton === null) {
      singleton = new LocalZone();
    }
    return singleton;
  }

  /** @override **/
  get type() {
    return "local";
  }

  /** @override **/
  get name() {
    if (Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["hasIntl"])()) {
      return new Intl.DateTimeFormat().resolvedOptions().timeZone;
    } else return "local";
  }

  /** @override **/
  get universal() {
    return false;
  }

  /** @override **/
  offsetName(ts, { format, locale }) {
    return Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["parseZoneInfo"])(ts, format, locale);
  }

  /** @override **/
  formatOffset(ts, format) {
    return Object(_impl_util_js__WEBPACK_IMPORTED_MODULE_0__["formatOffset"])(this.offset(ts), format);
  }

  /** @override **/
  offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }

  /** @override **/
  equals(otherZone) {
    return otherZone.type === "local";
  }

  /** @override **/
  get isValid() {
    return true;
  }
}


/***/ }),

/***/ "./src/cron/Cron.js":
/*!**************************!*\
  !*** ./src/cron/Cron.js ***!
  \**************************/
/*! exports provided: Cron */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cron", function() { return Cron; });
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./src/cron/settings.js");


const CronJob = __webpack_require__(/*! cron */ "./node_modules/cron/lib/cron.js").CronJob;

class Cron {

	schedule() {
		_settings__WEBPACK_IMPORTED_MODULE_0__["jobs"].forEach(job => {
			new CronJob({ cronTime: job.schedule, onTick: job.task }).start();
		});
	}

	start() {
		run();
	}
}

function run() {
	_settings__WEBPACK_IMPORTED_MODULE_0__["jobs"].forEach(job => {
		job.task();
	});
}


/***/ }),

/***/ "./src/cron/index.js":
/*!***************************!*\
  !*** ./src/cron/index.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Cron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cron */ "./src/cron/Cron.js");


const cron = new _Cron__WEBPACK_IMPORTED_MODULE_0__["Cron"]();

cron.schedule();

// Run jobs when the server starts
cron.start();


/***/ }),

/***/ "./src/cron/settings.js":
/*!******************************!*\
  !*** ./src/cron/settings.js ***!
  \******************************/
/*! exports provided: jobs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jobs", function() { return jobs; });
/* harmony import */ var _tasks_import__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks/import */ "./src/cron/tasks/import.js");


const jobs = [
	{
		name: 'Test',
		schedule: '* * * * * *',
		task: _tasks_import__WEBPACK_IMPORTED_MODULE_0__["default"],
		maxAgeSeconds: 3600 * 25
	}
];


/***/ }),

/***/ "./src/cron/tasks/import.js":
/*!**********************************!*\
  !*** ./src/cron/tasks/import.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
	console.log('Starting data import...');
});


/***/ })

/******/ });