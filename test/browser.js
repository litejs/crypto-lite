(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){



/*
 * @version    0.2.0
 * @date       2017-02-08
 * @stability  2 - Unstable
 * @author     Lauri Rooden <lauri@rooden.ee>
 * @license    MIT License
 */




!function(exports) {
	var crypto = exports.crypto || (exports.crypto = {})

	/**
	 * Convert array of integers to a hex string.
	 *
	 * @param {number[]} array of integers
	 * @return {string} HEX string
	 */

	function i2s(a) { // integer array to hex string
		for (var i = a.length; i--;) a[i] = ("0000000"+(a[i]>>>0).toString(16)).slice(-8)
		return a.join("")
	}

	/**
	 * Convert string to an array of integers.
	 *
	 * @param {string}
	 * @return {number[]} array of integers
	 */

	function s2i(_s) { // string to integer array
		var s = unescape(encodeURIComponent(_s))
		, len = s.length
		, i = 0
		, bin = []

		for (; i < len;) {
			bin[i>>2] = s.charCodeAt(i++)<<24 |
				s.charCodeAt(i++)<<16 |
				s.charCodeAt(i++)<<8 |
				s.charCodeAt(i++)
		}
		bin.len = len
		return bin
	}


	//** HMAC
	function hmac(hasher, _key, _txt) {
		var i = 0
		, ipad = []
		, opad = []
		, key = (_key.length > 64 ? hasher : s2i)(_key)
		, txt = typeof _txt == "string" ? s2i(_txt) : _txt
		, len = txt.len || txt.length * 4

		for (; i < 16;) {
			ipad[i] = key[i]^0x36363636
			opad[i] = key[i++]^0x5c5c5c5c
		}

		return hasher(opad.concat(hasher(ipad.concat(txt), 64 + len)))
	}

	crypto.hmac = function(digest, key, message) {
		return i2s(hmac(digest == "sha256" ? sha256 : sha1, key, message))
	}

	//*/

	/**
	 * A minimum iteration count of 1,000 is recommended.
	 * For especially critical keys,
	 * or for very powerful systems
	 * or systems where user-perceived performance is not critical,
	 * an iteration count of 10,000,000 may be appropriate.
	 *
	 * PBKDF2 is always used with HMAC,
	 * which is itself a construction which is built over
	 * an underlying hash function.
	 * So when we say "PBKDF2 with SHA-1",
	 * we actually mean "PBKDF2 with HMAC with SHA-1".
	 */

	//** PBKDF2
	// pbkdf2(sha256, this, salt, count, length || 32)
	// crypto.pbkdf2('secret', 'salt', 4096, 512, 'sha256', function(err, key) {
	// $PBKDF2$HMACSHA1:1000:akrvug==$Zi+c82tnjpcrRmUAHRd8h4ZRR5M=

	crypto.pbkdf2 = pbkdf2

	// crypto.pbkdf2('secret', 'salt', 4096, 512, 'sha256', function(err, key) {

	function pbkdf2(secret, salt, _count, length, digest) {
		var hasher = digest == "sha256" ? sha256 : sha1
		, count = _count || 1000
		, u, ui, i, j
		, k = 1
		, out = []
		, wlen = length>>2 || 5

		for (; out.length < wlen; k++) {
			u = ui = hmac(hasher, secret, salt+String.fromCharCode(k >> 24 & 0xF, k >> 16 & 0xF, k >>  8 & 0xF, k  & 0xF))

			for (i = count; --i;) {
				ui = hmac(hasher, secret, ui)
				for (j = ui.length; j--;) u[j] ^= ui[j]
			}

			//out = out.concat(u)
			out.push.apply(out, u)
		}
		return i2s(out).slice(0, length*2 || 40)
	}

	//*/


	function shaInit(bin, len) {
		if (typeof bin == "string") {
			bin = s2i(bin)
			len = bin.len
		} else len = len || bin.length<<2

		bin[len>>2] |= 0x80 << (24 - (31 & (len<<=3)))
		bin[((len + 64 >> 9) << 4) + 15] = len

		return bin
	}

	//** sha1
	function l(x, n) { // rotate left
		return (x<<n) | (x>>>(32-n))
	}

	function sha1(data, _len) {
		var a, b, c, d, e, t, j
		, i = 0
		, w = []
		, A = 0x67452301
		, B = 0xefcdab89
		, C = 0x98badcfe
		, D = 0x10325476
		, E = 0xc3d2e1f0
		, bin = shaInit(data, _len)
		, len = bin.length

		for (; i < len; i+=16, A+=a, B+=b, C+=c, D+=d, E+=e) {
			for (j=0, a=A, b=B, c=C, d=D, e=E; j < 80;) {
				w[j] = j < 16 ? bin[i+j] : l(w[j-3]^w[j-8]^w[j-14]^w[j-16], 1)
				t = (j<20 ? ((b&c)|(~b&d))+0x5A827999 : j<40 ? (b^c^d)+0x6ED9EBA1 : j<60 ? ((b&c)|(b&d)|(c&d))+0x8F1BBCDC : (b^c^d)+0xCA62C1D6)+l(a,5)+e+(w[j++]|0)
				e = d
				d = c
				c = l(b,30)
				b = a
				a = t|0
			}
		}
		return [A, B, C, D, E]
	}

	crypto.sha1 = function(data) {
		return i2s(sha1(data))
	}
	//*/


	//** sha256
	var initial_map = []
	, constants_map = []

	function buildMaps() {
		// getFractionalBits
		function a(e) {
			return (e - (e>>>0)) * 0x100000000 | 0
		}

		outer: for (var b = 0, c = 2, d; b < 64; c++) {
			// isPrime
			for (d = 2; d * d <= c; d++) if (c % d === 0) continue outer;
			if (b < 8) initial_map[b] = a(Math.pow(c, .5));
			constants_map[b++] = a(Math.pow(c, 1 / 3));
		}
	}

	function sha256(data, _len) {
		initial_map[0] || buildMaps()

		var a, b, c, d, e, f, g, h, t1, t2, j
		, i = 0
		, w = []
		, A = initial_map[0]
		, B = initial_map[1]
		, C = initial_map[2]
		, D = initial_map[3]
		, E = initial_map[4]
		, F = initial_map[5]
		, G = initial_map[6]
		, H = initial_map[7]
		, bin = shaInit(data, _len)
		, len = bin.length
		, K = constants_map


		for (; i < len; ) {
			a = A
			b = B
			c = C
			d = D
			e = E
			f = F
			g = G
			h = H

			for (j = 0; j < 64; ) {
				if (j < 16) w[j] = bin[i+j]
				else {
					t1 = w[j-2]
					t2 = w[j-15]
					w[j] = (t1>>>17^t1<<15^t1>>>19^t1<<13^t1>>>10) + (w[j-7]|0) + (t2>>>7^t2<<25^t2>>>18^t2<<14^t2>>>3) + (w[j-16]|0)
				}

				t1 = (w[j]|0) + h + (e>>>6^e<<26^e>>>11^e<<21^e>>>25^e<<7) + ((e&f)^((~e)&g)) + K[j++]
				t2 = (a>>>2^a<<30^a>>>13^a<<19^a>>>22^a<<10) + ((a&b)^(a&c)^(b&c))

				h = g
				g = f
				f = e
				e = (d + t1)|0
				d = c
				c = b
				b = a
				a = (t1 + t2)|0
			}
			A += a
			B += b
			C += c
			D += d
			E += e
			F += f
			G += g
			H += h
			i += 16
		}
		return [A, B, C, D, E, F, G, H]
	}

	crypto.sha256 = function(data) {
		return i2s(sha256(data))
	}
	//*/

}(this)



},{}],3:[function(require,module,exports){
(function (process){



/*
* @version    0.5.1
* @date       2016-07-26
* @stability  2 - Unstable
* @author     Lauri Rooden <lauri@rooden.ee>
* @license    MIT License
*/


!function(exports) {
	var doneTick, started
	, totalCases = 0
	, passedCases = 0
	, totalAsserts = 0
	, passedAsserts = 0
	, toString = Object.prototype.toString
	, hasOwn = Object.prototype.hasOwnProperty
	, bold  = '\u001b[1m'
	, red   = '\u001b[31m'
	, green = '\u001b[32m'
	, reset = '\u001b[0m'
	, proc = typeof process == "undefined" ? { argv: [] } : process
	, color = proc.stdout && proc.stdout.isTTY && proc.argv.indexOf("--no-color") == -1
	, v8 = {
		statusTexts: [
			"Unknown",
			"Function is optimized",
			"Function is not optimized",
			"Function is always optimized",
			"Function is never optimized",
			"Function is maybe deoptimized",
			"Function is optimized by TurboFan"
		]
	}

	try {
		["GetOptimizationStatus", "OptimizeFunctionOnNextCall"].map(function(name) {
			v8[name] = Function("fn", "return %" + name+ "(fn)")
		})
		v8.isNative = true
	} catch(e) {}

	if (!color) {
		bold = red = green = reset = ""
	}

	describe.result = ""

	function print(str) {
		describe.result += str + "\n"
		console.log(str)
	}

	function This() {
		return this
	}

	function type(obj) {
		// Standard clearly states that NaN is a number
		// but it is not useful for testing.
		return (
			obj == null || obj != obj ? "" + obj : toString.call(obj).slice(8, -1)
		).toLowerCase()
	}

	function deepEqual(actual, expected, strict, _circArr) {
		if (
			strict && actual === expected ||
			!strict && actual == expected ||
			// null == undefined
			actual == null && actual == expected
		) return true

		var key, keysA, keysB, len
		, actualType = type(actual)
		, circArr = _circArr || []

		if (
			actualType != type(expected) ||
			actual.constructor !== expected.constructor ||
			(actualType == "date" && +actual !== +expected) ||
			typeof actual != "object"
		) return false

		key = circArr.indexOf(actual)
		if (key > -1) return circArr[key + 1] === expected
		circArr.push(actual, expected)

		keysA = Object.keys(actual)
		len = keysA.length
		if (actualType == "array" || actualType == "arguments") {
			if (actual.length !== expected.length) return false
		} else {
			keysB = Object.keys(expected)
			if (len != keysB.length || !deepEqual(keysA.sort(), keysB.sort(), strict, circArr)) return false
		}
		for (; len--; ) {
			key = keysA[len]
			if (!deepEqual(actual[key], expected[key], strict, circArr)) return false
		}
		return true
	}

	function AssertionError(message, _stackStart) {
		this.name = "AssertionError"
		this.message = message
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, _stackStart || AssertionError)
		} else {
			this.stack = this.toString() + "\n" + (new Error()).stack
		}
	}
	AssertionError.prototype = Object.create(Error.prototype)


	function describe(name) {
		return new TestSuite(name)
	}

	function TestSuite(name) {
		var testSuite = this

		if (!started) {
			started = +new Date()
			print("TAP version 13")
		}

		testSuite.name  = name || "{unnamed test suite}"
		testSuite.cases = []

		print("# " + testSuite.name)

		return testSuite
	}



	TestSuite.prototype = {
		_test: This,
		describe: describe,
		it: function(name, options) {
			return this.test("it " + name, null, options)
		},
		test: function(name, next, options) {
			var testSuite = this
			, testCase = new TestCase(name, options, testSuite)


			if (next) next(testCase)

			return testCase
		},
		done: function(next) {
			if (this.done_) return
			this.done_ = +new Date()

			var failed = totalAsserts - passedAsserts

			print("1.." + totalCases)
			print("#" + (failed ? "" : green + bold) + " pass  " + passedCases
				+ "/" + totalCases
				+ " [" + passedAsserts + "/" + totalAsserts + "]"
				+ " in " + (this.done_ - started) + " ms"
				+ reset)

			if (failed) print("#" + red + bold + " fail  " + (totalCases - passedCases)
				+ " [" + failed + "]"
				+ reset)

			if (typeof next == "function") next()
			/*
			* FAILED tests 1, 3, 6
			* Failed 3/6 tests, 50.00% okay
			* PASS 1 test executed in 0.023s, 1 passed, 0 failed, 0 dubious, 0 skipped.
			*/
			if (proc.exit) proc.exit()
		}
	}

	function TestCase(name, options, testSuite) {
		var testCase = this
		, opts = testCase.options = options || {}
		testCase.num = ++totalCases
		testCase.name = name || "{unnamed test case}"
		testCase.suite = testSuite
		testCase.failed = []
		testCase.passedAsserts = 0
		testCase.totalAsserts = 0

		testSuite.cases.push( testCase )

		if (
			opts.skip ||
			(opts.skip = opts.v8Native && !v8.isNative && "No access to v8 natives") ) {
			testCase.ok = testCase.equal = testCase.type = testCase.run = This
		}

		;["describe", "it", "test", "done"].forEach(function(name) {
			testCase[name] = function() {
				testCase.end()
				return testSuite[name].apply(testSuite, arguments)
			}
		})

		clearTimeout(doneTick)
		doneTick = setTimeout(done, 50)

		function done() {
			if (testCase.ok == describe.it.ok) testSuite.done()
			else testCase.run(done)
		}

		return testCase
	}

	function stringify(item, tmp) {
		if (item && typeof item == "object") {
			if (item.constructor == Object) {
				tmp = Object.keys(item).slice(0, 5).map(function(key) {
					return key + ":" + stringify(item[key])
				})
				return "{" + (item.length > 5 ? tmp + ",..." : tmp) + "}"
			}
			if (Array.isArray(item)) {
				tmp = item.slice(0, 5).map(stringify)
				return "[" + (item.length > 5 ? tmp + ",..." : tmp) + "]"
			}
			if (item instanceof Date) {
				return item.toJSON()
			}
			return toString.call(item).slice(8, -1) + "(" + item.toString() + ")"
		}
		return JSON.stringify(item)
	}

	TestCase.prototype = describe.it = describe.assert = {
		wait: hold,
		ok: function ok(value, message, _stackStart) {
			var testCase = this
			totalAsserts++
			testCase.totalAsserts++
			try {
				if (typeof value == "function") {
					value = value.call(testCase)
				}
				if (!value) {
					if (!message) {
						message = "Should be truthy: " + stringify(value)
					} else if (Array.isArray(message)) {
						message = stringify(message[0]) + " " + message[1] + " " + stringify(message[2])
					}
					message = message + " #" + (testCase.passedAsserts + testCase.failed.length + 1)
					throw new AssertionError(message, _stackStart || ok)
				}
				passedAsserts++
				testCase.passedAsserts++
			} catch(e) {
				testCase.failed.push(testCase.options.noStack ? e.message : e.stack)
			}
			return testCase
		},
		notOk: function notOk(value, message) {
			var testCase = this
			if (typeof value == "function") {
				value = value.call(testCase)
			}
			return this.ok(
				!value,
				message || "Should be falsy: " + stringify(value),
				notOk
			)
		},
		equal: function equal(actual, expected, message) {
			return this.ok(
				deepEqual(actual, expected, true),
				message || [actual, "==", expected],
				equal
			)
		},
		notEqual: function notEqual(actual, expected, message) {
			return this.ok(
				!deepEqual(actual, expected, true),
				message || [actual, "!=", expected],
				notEqual
			)
		},
		strictEqual: function strictEqual(actual, expected, message) {
			return this.ok(
				actual === expected,
				message || [actual, "===", expected],
				strictEqual
			)
		},
		notStrictEqual: function notStrictEqual(actual, expected, message) {
			return this.ok(
				actual !== expected,
				message || [actual, "!==", expected],
				notStrictEqual
			)
		},
		isOptimized: function isOptimized(fn, args, scope) {
			if (!v8.isNative) {
				this.options.skip = "No access to v8 natives"
				return this
			}
			fn.apply(scope, args)
			v8.OptimizeFunctionOnNextCall(fn)
			fn.apply(scope, args)
			var status = v8.GetOptimizationStatus(fn)
			, name = fn.name || "(fn)"
			return this.ok(
				status == 1,
				name + ": " + v8.statusTexts[status],
				isOptimized
			)
		},
		throws: function throws(fn, message) {
			var actual = false
			, expected = true
			try {
				fn()
			} catch(e) {
				actual = true
			}
			return this.ok(actual, message || "throws", throws)
		},
		plan: function(num) {
			this.planned = num
			return this
		},
		end: function() {
			var testCase = this
			, name = testCase.num + " - " + testCase.name

			if (testCase.ended) return

			testCase.ended = new Date()

			if (testCase.options.skip) {
				passedCases++
				return print("ok " + name + " # skip - " + testCase.options.skip)
			}

			if (testCase.planned != void 0) {
				testCase.equal(testCase.planned, testCase.totalAsserts, null, "planned")
			}

			name += " [" + testCase.passedAsserts + "/" + testCase.totalAsserts + "]"

			if (testCase.failed.length) {
				print("not ok " + name + "\n---\n" + testCase.failed.join("\n") + "\n---")
			} else {
				passedCases++
				print("ok " + name)
			}
		},
		run: function(fn) {
			fn.call(this)
			return this
		},
		anyOf: function anyOf(a, b) {
			return this.ok(
				Array.isArray(b) && b.indexOf(a) != -1,
				"should be one of '" + b + "', got " + a,
				anyOf
			)
		},
		type: function assertType(thing, expected) {
			var t = type(thing)
			return this.ok(
				t === expected,
				"type should be " + expected + ", got " + t,
				assertType
			)
		}
	}

	TestCase.prototype.deepEqual = TestCase.prototype.equal
	TestCase.prototype.notDeepEqual = TestCase.prototype.notEqual

	exports.describe = describe.describe = describe

	var testPoint
	exports.test = function(name, next) {
		if (!testPoint) testPoint = describe()
		return testPoint = testPoint.test(name, next)
	}

	function wait(fn) {
		var pending = 1
		function resume() {
			if (!--pending && fn) fn.call(this)
		}
		resume.wait = function() {
			pending++
			return resume
		}
		return resume
	}

	function hold(ignore) {
		var k
		, obj = this
		, hooks = []
		, hooked = []
		, _resume = wait(resume)
		ignore = ignore || obj.syncMethods || []

		for (k in obj) if (typeof obj[k] == "function" && ignore.indexOf(k) == -1) !function(k) {
			hooked.push(k, hasOwn.call(obj, k) && obj[k])
			obj[k] = function() {
				hooks.push(k, arguments)
				return obj
			}
		}(k)

		/**
		 * `wait` is already in hooked array,
		 * so override hooked method
		 * that will be cleared on resume.
		 */
		obj.wait = _resume.wait

		return _resume

		function resume() {
			for (var v, scope = obj, i = hooked.length; i--; i--) {
				if (hooked[i]) obj[hooked[i-1]] = hooked[i]
				else delete obj[hooked[i-1]]
			}
			// i == -1 from previous loop
			for (; v = hooks[++i]; ) {
				scope = scope[v].apply(scope, hooks[++i]) || scope
			}
			hooks = hooked = null
		}
	}
}(this)


/*
* http://sourceforge.net/projects/portableapps/files/
*/


}).call(this,require('_process'))
},{"_process":1}],4:[function(require,module,exports){

var crypto = require("../").crypto

// when testing tests againts node js native crypto module
// crypto.DEFAULT_ENCODING = "hex"

require("testman").
describe("crypto-lite").
	it ("should hash sha1", {_skip:"manual"}).
		equal(crypto.sha1("abc") , "a9993e364706816aba3e25717850c26c9cd0d89d").
		equal(crypto.sha1("abc1ö") , "ed9006416a835d01c054c9272c52a1885571a9fc").
		equal(crypto.sha1("kkkkkkkkkkkkkkkkkkkkkkkkk") , "005cb6065579bb259bdc966dcc3d800b4c0e631b").
		equal(crypto.sha1("efgfsfgjfkdslkeföl") , "3228c5ff9b3f008816452fd2c55b6063abfcebf3").
		equal(crypto.sha1("GEThttps://weirdurl.ggnett.no/siteadmin/sites/1/placements") , "c2ad0bda24fbc0ecdc32f7cbdd2fdc8e9f276c99").

	it ("should hash sha256", {_skip:1}).
		equal(crypto.sha256("abc") , "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad").
		equal(crypto.sha256("abc1ö") , "555944eb51d8305f11989edc037c0a0fa9999b470c327b3940377fd2c6507ab3").
		equal(crypto.sha256("GEThttps://weirdurl.ggnett.no/siteadmin/sites/1/placements") , "f90406e3cb201bc7c485b846b9c1509085b702343ddca85159ee559e025b2e7f").

	it ("should have hmac").
		equal(crypto.hmac("sha1", "w", "q") , "697e084de5f14b207f78bd51e748fdd625e5d4e3").
		equal(crypto.hmac("sha1", "w23e", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc95") , "d2308ef241f9163aa65105959600f870f8c0e60b").

		equal(crypto.hmac("sha256", "w", "q") , "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22").
		equal(crypto.hmac("sha256", "w23e", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc95") , "1769221eb6c4f6e52bed133c64d1ba118ef72bfaf91b39f065e0aa43a4788031").
		equal(crypto.hmac("sha256", "key", "GEThttps://weirdurl.ggnett.no/siteadmin/sites/1/placements") , "6d15c0ed95f53580e777ce36b4d96419632723ab42a17c758628a4aa000ffa1d").
		equal(crypto.hmac("sha256", "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc9"
		) , "0bff2ce11dc8ea7b14264dd229413357079b6427262e2e6a8e924ca8c8012dbc").
		equal(crypto.hmac("sha256", "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22a", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc9"
		) , "ba3f30aa0d0fecbe54dd3686cb97c0e39863817393d951162fc4297c59658ecc").
		equal(crypto.hmac("sha256", "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc9b"
		) , "b9ff96497f1631eee2890ad1d38315bab77cd6e8fcac2d0b9ed84b47c49739ff").
		equal(crypto.hmac("sha256", "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22a", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc9b"
		) , "4b8846081d35037e96b7bd836c03b3eb7a304b32b6f47a3af913429078d4fe63").
		equal(crypto.hmac("sha256", "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22abcd", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc9bcde"
		) , "dc07e327e8f0f68947695d8117edb41f315cc70398a9ef251290af12d16afdfe").

	it ("should hash pbkdf2 with sha1").
		equal(crypto.pbkdf2("password", "salt") , "6e88be8bad7eae9d9e10aa061224034fed48d03f").
		equal(crypto.pbkdf2("password", "salt", 1, 20) , "0c60c80f961f0e71f3a9b524af6012062fe037a6").
		equal(crypto.pbkdf2("password", "salt", 2, 20) , "ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957").
		equal(crypto.pbkdf2("password", "salt", 1, 20, "sha1") , "0c60c80f961f0e71f3a9b524af6012062fe037a6").
		equal(crypto.pbkdf2("password", "salt", 2, 20, "sha1") , "ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957").
		equal(crypto.pbkdf2("password", "salt", 1, 32, "sha256") , "120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b").
		equal(crypto.pbkdf2("password", "salt", 2, 32, "sha256") , "ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43").
		equal(crypto.pbkdf2("password", "salt", 2,  1, "sha256") , "ae").
		equal(crypto.pbkdf2("password", "salt", 2,  2, "sha256") , "ae4d").
		equal(crypto.pbkdf2("password", "salt", 2,  3, "sha256") , "ae4d0c").
		equal(crypto.pbkdf2("password", "salt", 2,  4, "sha256") , "ae4d0c95").
		equal(crypto.pbkdf2("password", "salt", 2,  5, "sha256") , "ae4d0c95af").
		equal(crypto.pbkdf2("password", "salt", 2,  6, "sha256") , "ae4d0c95af6b").
		equal(crypto.pbkdf2("password", "salt", 2,  7, "sha256") , "ae4d0c95af6b46").
		equal(crypto.pbkdf2("password", "salt", 2,  8, "sha256") , "ae4d0c95af6b46d3").
		equal(crypto.pbkdf2("password", "salt", 2,  9, "sha256") , "ae4d0c95af6b46d32d").
		equal(crypto.pbkdf2("password", "salt", 2, 10, "sha256") , "ae4d0c95af6b46d32d0a").
		equal(crypto.pbkdf2("password", "salt", 2, 11, "sha256") , "ae4d0c95af6b46d32d0adf").
		equal(crypto.pbkdf2("password", "salt", 2, 12, "sha256") , "ae4d0c95af6b46d32d0adff9").
done(function() {
	if (typeof document != "undefined") {
		document.write(require("testman").describe.result.split("\n").join("<br>"))
	}
})


},{"../":2,"testman":3}]},{},[4]);
