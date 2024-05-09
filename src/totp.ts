import { generateHOTP, verifyHOTP } from "./hotp.js";
import { KeyURI } from "./key-uri.js";

export function generateTOTP(key: Uint8Array, intervalInSeconds: number, digits: number) {
	if (digits < 6 || digits > 8) {
		throw new TypeError("Digits must be between 6 and 8");
	}
	const counter = BigInt(Math.floor(Date.now() / (intervalInSeconds * 1000)));
	const hotp = generateHOTP(key, counter, digits);
	return hotp;
}

export function verifyTOTP(
	otp: string,
	key: Uint8Array,
	intervalInSeconds: number,
	digits: number
) {
	const counter = BigInt(Math.floor(Date.now() / (intervalInSeconds * 1000)));
	const valid = verifyHOTP(otp, key, counter, digits);
	return valid;
}

export function createTOTPKeyURI(issuer: string, accountName: string, secret: Uint8Array): KeyURI {
	const uri = new KeyURI("totp", issuer, accountName, secret);
	return uri;
}
