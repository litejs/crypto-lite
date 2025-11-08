
export type HashAlgo = "sha1" | "sha224" | "sha256";

export interface HotpOptions {
	counter: number;
	digits?: number;
	enc?: "base32";
}

export interface TotpOptions {
	time?: number;
	t0?: number;
	step?: number;
	digits?: number;
	enc?: "base32";
}

export function hash(algo: HashAlgo, msg: string): string;
export function sha1(msg: string): string;
export function sha224(msg: string): string;
export function sha256(msg: string): string;

export function hmac(algo: HashAlgo, key: string, msg: string): string;

export function pbkdf2(
	password: string,
	salt: string,
	iterations: number,
	keylen: number,
	algo: HashAlgo
): string;

export function hotp(secret: string, options: HotpOptions): string;
export function totp(secret: string, options: TotpOptions): string;

declare const cryptoLite: {
	hash: typeof hash;
	sha1: typeof sha1;
	sha224: typeof sha224;
	sha256: typeof sha256;
	hmac: typeof hmac;
	pbkdf2: typeof pbkdf2;
	hotp: typeof hotp;
	totp: typeof totp;
};

export default cryptoLite;

