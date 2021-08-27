
describe("HOTP - HMAC-Based One-Time Password", function() {
	var hotp = require("../").crypto.hotp

	this.test("RFC 4226 Appendix D - Test Values", function(assert) {
		var key = "12345678901234567890"
		, tests = [
			{ count: 0, hotp: "755224" },
			{ count: 1, hotp: "287082" },
			{ count: 2, hotp: "359152" },
			{ count: 3, hotp: "969429" },
			{ count: 4, hotp: "338314" },
			{ count: 5, hotp: "254676" },
			{ count: 6, hotp: "287922" },
			{ count: 7, hotp: "162583" },
			{ count: 8, hotp: "399871" },
			{ count: 9, hotp: "520489" }
		]

		tests.forEach(function(test) {
			assert.equal(hotp(key, test.count), test.hotp)
		})
		assert.end()
	})
})

