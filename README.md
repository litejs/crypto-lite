
[1]: https://raw.github.com/litejs/crypto-lite/master/crypto-lite.js
[2]: https://raw.github.com/litejs/crypto-lite/master/min.crypto-lite.js
[3]: https://raw.github.com/litejs/crypto-lite/master/tests/test.html "tests/test.html"
[4]: http://nodejs.org/api/crypto.html
[travis-img]: https://travis-ci.org/litejs/crypto-lite.png?branch=master
[travis-url]: https://travis-ci.org/litejs/crypto-lite

    @version  0.0.1
    @date     2014-04-21

Standard cryptographic algorithms &ndash; [![Build][]][1] [![Coverage][]][2] [![Gittip][]][3]
=================================

Lite version of sha1, sha256, hmac, pbkdf2 writen in javascript.


## How to use in browser

```html
<script src=crypto-lite.js></script>

<script>
var hash = "secret".sha1()
// e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4
</script>
```

See [test.html][3] for more examples

## How to use in node.js

Although it should work in node.js, you should [use native][4] api there.

npm install crypto-lite

```javascript
var crypto = require("crypto-lite")

```


### Licence

Copyright (c) 2014 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


