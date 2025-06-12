
describe("HMAC - Keyed-Hashing for Message Authentication", function() {
	var hmac = require("../").hmac

	this.test("Extra tests", function(assert) {
		assert
		.equal(hmac("sha1", "w", "q") , "697e084de5f14b207f78bd51e748fdd625e5d4e3")
		.equal(hmac("sha1", "w23e", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc95") , "d2308ef241f9163aa65105959600f870f8c0e60b")

		.equal(hmac("sha256", "w", "q") , "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22")
		.equal(hmac("sha256", "w23e", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc95") , "1769221eb6c4f6e52bed133c64d1ba118ef72bfaf91b39f065e0aa43a4788031")
		.equal(hmac("sha256", "key", "GEThttps://weirdurl.ggnett.no/siteadmin/sites/1/placements") , "6d15c0ed95f53580e777ce36b4d96419632723ab42a17c758628a4aa000ffa1d")
		.equal(hmac("sha256", "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc9"
		) , "0bff2ce11dc8ea7b14264dd229413357079b6427262e2e6a8e924ca8c8012dbc")
		.equal(hmac("sha256", "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22a", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc9"
		) , "ba3f30aa0d0fecbe54dd3686cb97c0e39863817393d951162fc4297c59658ecc")
		.equal(hmac("sha256", "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc9b"
		) , "b9ff96497f1631eee2890ad1d38315bab77cd6e8fcac2d0b9ed84b47c49739ff")
		.equal(hmac("sha256", "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22a", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc9b"
		) , "4b8846081d35037e96b7bd836c03b3eb7a304b32b6f47a3af913429078d4fe63")
		.equal(hmac("sha256", "aa0faac9b60e5d328675f33221327654ad791e2935a4ae12e94c1ac939afdf22abcd", "8d48be98c11eb482f08afbce6d1902b0f0c028f987d58a595fd7fbf365a3dcc9bcde"
		) , "dc07e327e8f0f68947695d8117edb41f315cc70398a9ef251290af12d16afdfe")
		.end()
	})
})

