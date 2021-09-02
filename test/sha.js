
describe("SHA", function() {
	var crypto = require("../").crypto

	this
	.should("hash sha1", function(assert) {
		assert
		.equal(crypto.sha1("abc") , "a9993e364706816aba3e25717850c26c9cd0d89d")
		.equal(crypto.sha1("abc1ö") , "ed9006416a835d01c054c9272c52a1885571a9fc")
		.equal(crypto.sha1("kkkkkkkkkkkkkkkkkkkkkkkkk") , "005cb6065579bb259bdc966dcc3d800b4c0e631b")
		.equal(crypto.sha1("efgfsfgjfkdslkeföl") , "3228c5ff9b3f008816452fd2c55b6063abfcebf3")
		.equal(crypto.sha1("GEThttps://weirdurl.ggnett.no/siteadmin/sites/1/placements") , "c2ad0bda24fbc0ecdc32f7cbdd2fdc8e9f276c99")
		.end()
	})

	.should("hash sha224", function(assert) {
		assert
		.equal(crypto.sha224("abc") , "23097d223405d8228642a477bda255b32aadbce4bda0b3f7e36c9da7")
		.end()
	})

	.should("hash sha256", function(assert) {
		assert
		.equal(crypto.sha256("abc") , "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad")
		.equal(crypto.sha256("abc1ö") , "555944eb51d8305f11989edc037c0a0fa9999b470c327b3940377fd2c6507ab3")
		.equal(crypto.sha256("GEThttps://weirdurl.ggnett.no/siteadmin/sites/1/placements") , "f90406e3cb201bc7c485b846b9c1509085b702343ddca85159ee559e025b2e7f")
		.end()
	})
})

