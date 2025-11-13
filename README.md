
[1]: https://badgen.net/coveralls/c/github/litejs/crypto-lite
[2]: https://coveralls.io/r/litejs/crypto-lite
[3]: https://badgen.net/packagephobia/install/crypto-lite
[4]: https://packagephobia.now.sh/result?p=crypto-lite
[5]: https://badgen.net/badge/icon/Buy%20Me%20A%20Tea/orange?icon=kofi&label
[6]: https://www.buymeacoffee.com/lauriro


Crypto lite &ndash; [![Coverage][1]][2] [![Size][3]][4] [![Buy Me A Tea][5]][6]
===========

Pure JavaScript cryptographic algorithms:

 - [RFC 3174][] - SHA-1 - Secure Hash Algorithm 1
 - [RFC 3874][] - SHA-224 - A 224-bit One-way Hash Function
 - [FIPS 180-2][] - SHA-256 - Secure Hash Algorithm 2
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

## How to use

```javascript
import { sha1, sha224, sha256, hmac, pbkdf2, hotp, totp } from "crypto-lite"

sha1("secret")
// e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4
sha256("secret")
// 2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b
hmac("sha1", "key", "message")
// 2088df74d5f2146b48146caf4965377e9d0be3a4
hmac("sha256", "key", "message")
// 6e9ef29b75fffc5b7abae527d58fdadb2fe42e7219011976917343065f58ed4a
pbkdf2("password", "salt", 1, 20, "sha1")
// 0c60c80f961f0e71f3a9b524af6012062fe037a6
hotp("secret", { counter: 1, digits: 6 })
totp("secret", { time: Date.now()/1000, digits: 6, t0: 0, step: 30 }) // Defaults
```

hotp/totp options accepts `{enc: "base32"}` for [RFC 4648 Base32][RFC 4648] encoding.


> Copyright (c) 2014-2025 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[MIT License](https://litejs.com/MIT-LICENSE.txt) |
[GitHub repo](https://github.com/litejs/crypto-lite) |
[npm package](https://npmjs.org/package/crypto-lite) |
[Buy Me A Tea][6]

