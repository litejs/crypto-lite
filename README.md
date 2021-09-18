[3]: https://badgen.net/coveralls/c/github/litejs/crypto-lite
[4]: https://coveralls.io/r/litejs/crypto-lite
[5]: https://badgen.net/packagephobia/install/crypto-lite
[6]: https://packagephobia.now.sh/result?p=crypto-lite
[7]: https://badgen.net/badge/icon/Buy%20Me%20A%20Tea/orange?icon=kofi&label
[8]: https://www.buymeacoffee.com/lauriro


Cryptographic algorithms &ndash; [![Coverage][3]][4] [![Size][5]][6] [![Buy Me A Tea][7]][8]
========================

Pure JavaScript implementations for:

 - [RFC 3174][] - SHA-1 - Secure Hash Algorithm 1
 - [FIPS 180-2][] - SHA-256 - Secure Hash Algorithm 2
 - [RFC 3874][] - SHA-224 - A 224-bit One-way Hash Function
 - [RFC 2104][] - HMAC - Keyed-Hashing for Message Authentication
 - [RFC 8018][] - PBKDF2 - Password-Based Key Derivation Function 2
 - [RFC 6238][] - TOTP - Time-Based One-Time Password
 - [RFC 4226][] - HOTP - HMAC-Based One-Time Password


[RFC 2104]: https://datatracker.ietf.org/doc/html/rfc2104
[RFC 3174]: https://datatracker.ietf.org/doc/html/rfc3174
[RFC 3874]: https://datatracker.ietf.org/doc/html/rfc3874
[RFC 4226]: https://datatracker.ietf.org/doc/html/rfc4226
[RFC 4648]: https://datatracker.ietf.org/doc/html/rfc4648
[RFC 6238]: https://datatracker.ietf.org/doc/html/rfc6238
[RFC 8018]: https://datatracker.ietf.org/doc/html/rfc8018
[FIPS 180-2]: https://csrc.nist.gov/csrc/media/publications/fips/180/2/archive/2002-08-01/documents/fips180-2withchangenotice.pdf

## How to use in browser

```html
<script src=crypto-lite.js></script>

<script>
crypto.sha1("secret")
// e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4
crypto.sha256("secret")
// 2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b
crypto.hmac("sha1", "key", "message")
// 2088df74d5f2146b48146caf4965377e9d0be3a4
crypto.hmac("sha256", "key", "message")
// 6e9ef29b75fffc5b7abae527d58fdadb2fe42e7219011976917343065f58ed4a
crypto.pbkdf2("password", "salt", 1, 20, "sha1")
// 0c60c80f961f0e71f3a9b524af6012062fe037a6
crypto.hotp("secret", { counter: 1, digits 6, algo: "sha1" })
crypto.totp("secret", { time: Date.now(), t0: 0, step: 30, digits 6, algo: "sha1" }) // Defaults
</script>
```

hotp/totp options accepts `{enc: "base32"}` for [RFC 4648 Base32][RFC 4648] encoding.


## How to use in node.js

Although it should work in node.js,
you should [use native](http://nodejs.org/api/crypto.html) api there.

npm install crypto-lite

```javascript
var crypto = require("crypto-lite").crypto

```


External links
--------------

-   [Source-code on Github](https://github.com/litejs/crypto-lite)
-   [Package on npm](https://npmjs.org/package/crypto-lite)


### Licence

Copyright (c) 2014-2021 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


