import { base32 } from "@oslojs/encoding";
import { generateHOTP, verifyHOTP } from "./hotp.js";

export function generateTOTP(key: Uint8Array, intervalInSeconds: number, digits: number): string {
	if (digits < 6 || digits > 8) {
		throw new TypeError("Digits must be between 6 and 8");
	}
	const counter = BigInt(Math.floor(Date.now() / (intervalInSeconds * 1000)));
	const hotp = generateHOTP(key, counter, digits);
	return hotp;
}

export function verifyTOTP(
	key: Uint8Array,
	intervalInSeconds: number,
	digits: number,
	otp: string
): boolean {
	const counter = BigInt(Math.floor(Date.now() / (intervalInSeconds * 1000)));
	const valid = verifyHOTP(key, counter, digits, otp);
	return valid;
}

export function createTOTPKeyURI(
	issuer: string,
	accountName: string,
	key: Uint8Array,
	periodInSeconds: number,
	digits: number
): string {
	const encodedIssuer = encodeURIComponent(issuer);
	const encodedAccountName = encodeURIComponent(accountName);
	const base = `otpauth://totp/${encodedIssuer}:${encodedAccountName}`;
	const params = new URLSearchParams();
	params.set("issuer", issuer);
	params.set("algorithm", "SHA1");
	params.set("secret", base32.encodeNoPadding(key));
	params.set("period", periodInSeconds.toString());
	params.set("digits", digits.toString());
	return base + "?" + params.toString();
}
