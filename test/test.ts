

import cryptoLite, { sha1, hotp, totp } from "../index";

console.log(sha1("abc"));
console.log(cryptoLite.sha256("abc"));

const otp = hotp("secret", { counter: 1 });
const totpCode = totp("secret", { time: Date.now() });
console.log(otp, totpCode);

