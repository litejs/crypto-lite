
describe("TOTP - Time-Based One-Time Password", function() {
	var totp = require("../").totp

	this
	.test("RFC 6238 Appendix B - Test Vectors", function(assert) {
		var keys = {
			sha1: "12345678901234567890",
			sha256: "12345678901234567890123456789012"
		}
		, tests = [
			{ time: 59,          totp: "94287082", digits: 8 },
			{ time: 59,          totp: "46119246", digits: 8, algo: "sha256" },
			{ time: 1111111109,  totp: "07081804", digits: 8 },
			{ time: 1111111109,  totp: "68084774", digits: 8, algo: "sha256" },
			{ time: 1111111111,  totp: "14050471", digits: 8 },
			{ time: 1111111111,  totp: "67062674", digits: 8, algo: "sha256" },
			{ time: 1234567890,  totp: "89005924", digits: 8 },
			{ time: 1234567890,  totp: "91819424", digits: 8, algo: "sha256" },
			{ time: 2000000000,  totp: "69279037", digits: 8 },
			{ time: 2000000000,  totp: "90698825", digits: 8, algo: "sha256" },
			{ time: 20000000000, totp: "65353130", digits: 8 },
			{ time: 20000000000, totp: "77737706", digits: 8, algo: "sha256" }
		]
		tests.forEach(function(test) {
			assert.equal(totp(keys[test.algo||"sha1"], test), test.totp)
		})
		assert.equal(totp(keys.sha1, 1).length, 6)
		assert.equal(totp(keys.sha1).length, 6)
		assert.end()
	})
})

