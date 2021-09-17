
describe("HOTP - HMAC-Based One-Time Password", function() {
	var hotp = require("../").crypto.hotp

	this.test("RFC 4226 Appendix D - Test Values", function(assert) {
		var key = "12345678901234567890"
		, tests = [
			{ counter: 0, hotp: "755224" },
			{ counter: 0, hotp: "755224", key: "GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ", enc: "base32" },
			{ counter: 0, hotp: "755224", key: "gezdgnbvgy3tqojqgezdgnbvgy3tqojq", enc: "base32" },
			{ counter: 0, hotp: "328482", key: "aaaaaaaa", enc: "base32" },
			{ counter: 0, hotp: "328482", key: "aaa aaa=aa==", enc: "base32" },
			{ counter: 0, hotp: "328482", key: "\0\0\0\0\0" },
			{ counter: 1, hotp: "287082" },
			{ counter: 2, hotp: "359152" },
			{ counter: 3, hotp: "969429" },
			{ counter: 4, hotp: "338314" },
			{ counter: 5, hotp: "254676" },
			{ counter: 6, hotp: "287922" },
			{ counter: 7, hotp: "162583" },
			{ counter: 8, hotp: "399871" },
			{ counter: 9, hotp: "520489" },
			// Extra tests with 8 digit
			{ counter: 0, hotp: "84755224", digits: 8 },
			{ counter: 1, hotp: "94287082", digits: 8 },
			{ counter: 2, hotp: "37359152", digits: 8 },
			{ counter: 3, hotp: "26969429", digits: 8 },
			{ counter: 4, hotp: "40338314", digits: 8 },
			{ counter: 5, hotp: "68254676", digits: 8 },
			{ counter: 6, hotp: "18287922", digits: 8 },
			{ counter: 7, hotp: "82162583", digits: 8 },
			{ counter: 8, hotp: "73399871", digits: 8 },
			{ counter: 9, hotp: "45520489", digits: 8 }
		]

		tests.forEach(function(test) {
			assert.equal(hotp(test.key || key, test), test.hotp)
		})
		assert.equal(hotp(key, 1), "287082")
		assert.end()
	})
})

