

/*! https://litejs.com/MIT-LICENSE.txt */
// node v15.7.0	introduced base64url encoding.


!function(exports) {
	"use strict";

	var assign = Object.assign
	, fromCharCode = String.fromCharCode

	function intToHex(arr) {
		for (var i = arr.length; i--;) arr[i] = ("0000000" + (arr[i] >>> 0).toString(16)).slice(-8)
		return arr.join("")
	}

	function strToInt(str) {
		str = unescape(encodeURIComponent(str))
		var i = 0
		, arr = []
		, len = arr.len = str.length

		for (; i < len;) {
			arr[i>>2] = str.charCodeAt(i++)<<24 |
				str.charCodeAt(i++)<<16 |
				str.charCodeAt(i++)<<8 |
				str.charCodeAt(i++)
		}
		return arr
	}

	function rotL(val, count) {
		return (val << count) | (val >>> (32 - count))
	}

	//** HMAC
	function hmac(hasher, _key, _txt) {
		hasher = hasher == "sha256" ? sha256 : sha1
		var i = 0
		, ipad = []
		, opad = []
		, key = (_key.length > 64 ? hasher : strToInt)(_key)
		, txt = typeof _txt == "string" ? strToInt(_txt) : _txt
		, len = txt.len || txt.length * 4

		for (; i < 16;) {
			ipad[i] = key[i]^0x36363636
			opad[i] = key[i++]^0x5c5c5c5c
		}

		return hasher(opad.concat(hasher(ipad.concat(txt), 64 + len)))
	}

	exports.hmac = function(digest, key, message) {
		return intToHex(hmac(digest, key, message))
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

	exports.pbkdf2 = pbkdf2

	// crypto.pbkdf2('secret', 'salt', 4096, 512, 'sha256', function(err, key) {

	function pbkdf2(secret, salt, count, length, digest) {
		var u, ui, i, j
		, k = 1
		, out = []
		, wlen = length>>2 || 5

		for (; out.length < wlen; k++) {
			u = ui = hmac(digest, secret, salt + fromCharCode(k >> 24 & 0xF, k >> 16 & 0xF, k >>  8 & 0xF, k  & 0xF))

			for (i = count || 1000; --i;) {
				ui = hmac(digest, secret, ui)
				for (j = ui.length; j--;) u[j] ^= ui[j]
			}

			//out = out.concat(u)
			out.push.apply(out, u)
		}
		return intToHex(out).slice(0, length*2 || 40)
	}

	//*/

	//** HOTP
	exports.hotp = hotp
	function hotp(key, opts) {
		opts = assign({
			counter: typeof opts === "number" ? opts : 0,
			digits: 6,
			algo: "sha1"
		}, opts)
		var arr = hmac(
			opts.algo,
			opts.enc == "base32" ? base32Decode(key) : key,
			[0, opts.counter]
		)
		, offset = arr[arr.length-1]&15
		return ("0000000" + (0x7FFFFFFF & parseInt(intToHex(arr).substr(2*offset, 8), 16))).slice(-opts.digits)
	}
	// RFC 4648 Base32
	function base32Decode(str) {
		return str.replace(/./g, function(c) {
			c = c.charCodeAt()
			return (c - (c < 48 ? c : c < 58 ? -8 : c < 65 ? c : c < 97 ? 33 : 65)).toString(2).slice(-5)
		})
		.replace(/.{1,8}/g, function(c) {
			return fromCharCode(parseInt(c, 2))
		})
	}
	//*/

	//** TOTP
	exports.totp = totp
	function totp(key, opts) {
		opts = assign({
			time: typeof opts === "number" ? opts : Math.floor(Date.now()/1000),
			t0: 0,
			step: 30
		}, opts)
		opts.counter = Math.floor((opts.time - opts.t0)/opts.step)
		return hotp(key, opts)
	}
	//*/

	function shaInit(bin, len) {
		if (typeof bin == "string") {
			bin = strToInt(bin)
			len = bin.len
		} else len = len || bin.length<<2

		bin[len>>2] |= 0x80 << (24 - (31 & (len<<=3)))
		bin[((len + 64 >> 9) << 4) + 15] = len

		return bin
	}

	//** sha1
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
				w[j] = j < 16 ? bin[i+j] : rotL(w[j-3]^w[j-8]^w[j-14]^w[j-16], 1)
				t = (
					j < 20 ? ((b&c)|(~b&d)) + 0x5A827999 :
					j < 40 ? (b^c^d) + 0x6ED9EBA1 :
					j < 60 ? ((b&c)|(b&d)|(c&d)) + 0x8F1BBCDC :
					(b^c^d) + 0xCA62C1D6
				) + rotL(a, 5) + e + (w[j++]|0)
				e = d
				d = c
				c = rotL(b,30)
				b = a
				a = t|0
			}
		}
		return [A, B, C, D, E]
	}

	exports.sha1 = function(data) {
		return intToHex(sha1(data))
	}
	//*/


	//** sha256
	var initial_map = []
	, constants_map = []

	function buildMaps() {
		// getFractionalBits
		function powFraction(c, e) {
			c = Math.pow(c, e)
			return (c - (c>>>0)) * 0x100000000 | 0
		}

		outer: for (var b = 0, c = 2, d; b < 64; c++) {
			// isPrime
			for (d = 2; d * d <= c; d++) if (c % d === 0) continue outer;
			if (b < 8) initial_map[b] = powFraction(c, 0.5)
			constants_map[b++] = powFraction(c, 1 / 3)
		}
	}

	function sha256(data, _len, is224) {
		if (!initial_map[0]) buildMaps()

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

		if (is224) {
			A = 0xc1059ed8
			B = 0x367cd507
			C = 0x3070dd17
			D = 0xf70e5939
			E = 0xffc00b31
			F = 0x68581511
			G = 0x64f98fa7
			H = 0xbefa4fa4
		}

		for (; i < len; i+=16, A+=a, B+=b, C+=c, D+=d, E+=e, F+=f, G+=g, H+=h) {
			for (j=0, a=A, b=B, c=C, d=D, e=E, f=F, g=G, h=H; j < 64; ) {
				if (j < 16) w[j] = bin[i+j]
				else {
					t1 = w[j-2]
					t2 = w[j-15]
					w[j] = (rotL(t1, 15)^rotL(t1, 13)^t1>>>10) + (w[j-7]|0) + (rotL(t2, 25)^rotL(t2, 14)^t2>>>3) + (w[j-16]|0)
				}

				t1 = (w[j]|0) + h + (rotL(e, 26)^rotL(e, 21)^rotL(e, 7)) + ((e&f)^((~e)&g)) + K[j++]
				t2 = (rotL(a, 30)^rotL(a, 19)^rotL(a, 10)) + ((a&b)^(a&c)^(b&c))

				h = g
				g = f
				f = e
				e = (d + t1)|0
				d = c
				c = b
				b = a
				a = (t1 + t2)|0
			}
		}
		return [A, B, C, D, E, F, G, H]
	}

	exports.sha224 = function(data) {
		return intToHex(sha256(data, 0, 1)).slice(0, 56)
	}
	exports.sha256 = function(data) {
		return intToHex(sha256(data))
	}
	//*/

}(this) // jshint ignore:line


