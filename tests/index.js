
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

