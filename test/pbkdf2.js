
describe("PBKDF2 - Password-Based Key Derivation Function", function() {
	var pbkdf2 = require("../").crypto.pbkdf2

	this
	.test("RFC 6070 PBKDF2 HMAC-SHA1 Test Vectors", function(assert) {
		var tests = [
			{ DK: "0c60c80f961f0e71f3a9b524af6012062fe037a6",           c: 1,        len: 20, P: "password",                 S: "salt" },
			{ DK: "ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957",           c: 2,        len: 20, P: "password",                 S: "salt" },
			{ DK: "4b007901b765489abead49d926f721d065a429c1",           c: 4096,     len: 20, P: "password",                 S: "salt" },
			//{ DK: "eefe3d61cd4da4e4e9945b3d6ba2158c2634e984",           c: 16777216, len: 20, P: "password",                 S: "salt" },
			{ DK: "3d2eec4fe41c849b80c8d83662c0e44a8b291a964cf2f07038", c: 4096,     len: 25, P: "passwordPASSWORDpassword", S: "saltSALTsaltSALTsaltSALTsaltSALTsalt" },
			{ DK: "56fa6aa75548099dcc37d7f03425e0c3",                   c: 4096,     len: 16, P: "pass\0word",               S: "sa\0lt"}
		]

		tests.forEach(function(test) {
			assert.equal(pbkdf2(test.P, test.S, test.c, test.len), test.DK)
		})
		assert.end()
	})
	.test("RFC 7914 PBKDF2 HMAC-SHA-256 Test Vectors", function(assert) {
		var tests = [
			{ DK: "55ac046e56e3089fec1691c22544b605f94185216dde0465e68b9d57c20dacbc49ca9cccf179b645991664b39d77ef317c71b845b1e30bd509112041d3a19783", c: 1,     len: 64, P: "passwd",   S: "salt" },
			//{ DK: "4ddcd8f60b98be21830cee5ef22701f9641a4418d04c0414aeff08876b34ab56a1d425a1225833549adb841b51c9b3176a272bdebba1d078478f62b397f33c8d", c: 80000, len: 64, P: "Password", S: "NaCl" }
		]

		tests.forEach(function(test) {
			assert.equal(pbkdf2(test.P, test.S, test.c, test.len, "sha256"), test.DK)
		})
		assert.end()
	})
	.test("More tests", function(assert) {
		assert
		.equal(pbkdf2("password", "salt") , "6e88be8bad7eae9d9e10aa061224034fed48d03f")
		.equal(pbkdf2("password", "salt", 2, 20, "sha1") , "ea6c014dc72d6f8ccd1ed92ace1d41f0d8de8957")
		.equal(pbkdf2("password", "salt", 1, 32, "sha256") , "120fb6cffcf8b32c43e7225256c4f837a86548c92ccc35480805987cb70be17b")
		.equal(pbkdf2("password", "salt", 2, 32, "sha256") , "ae4d0c95af6b46d32d0adff928f06dd02a303f8ef3c251dfd6e2d85a95474c43")
		.equal(pbkdf2("password", "salt", 2,  1, "sha256") , "ae")
		.equal(pbkdf2("password", "salt", 2,  2, "sha256") , "ae4d")
		.equal(pbkdf2("password", "salt", 2,  3, "sha256") , "ae4d0c")
		.equal(pbkdf2("password", "salt", 2,  4, "sha256") , "ae4d0c95")
		.equal(pbkdf2("password", "salt", 2,  5, "sha256") , "ae4d0c95af")
		.equal(pbkdf2("password", "salt", 2,  6, "sha256") , "ae4d0c95af6b")
		.equal(pbkdf2("password", "salt", 2,  7, "sha256") , "ae4d0c95af6b46")
		.equal(pbkdf2("password", "salt", 2,  8, "sha256") , "ae4d0c95af6b46d3")
		.equal(pbkdf2("password", "salt", 2,  9, "sha256") , "ae4d0c95af6b46d32d")
		.equal(pbkdf2("password", "salt", 2, 10, "sha256") , "ae4d0c95af6b46d32d0a")
		.equal(pbkdf2("password", "salt", 2, 11, "sha256") , "ae4d0c95af6b46d32d0adf")
		.equal(pbkdf2("password", "salt", 2, 12, "sha256") , "ae4d0c95af6b46d32d0adff9")
		.end()
	})
})


