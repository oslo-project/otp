import { bigEndian } from "@oslojs/binary";
import { hmac } from "@oslojs/crypto/hmac";
import { SHA1 } from "@oslojs/crypto/sha1";
import { KeyURI } from "./key-uri.js";
import { constantTimeEqual } from "@oslojs/crypto/subtle";

export function generateHOTP(key: Uint8Array, counter: bigint, digits: number): string {
	if (digits < 6 || digits > 8) {
		throw new TypeError("Digits must be between 6 and 8");
	}
	const counterBytes = new Uint8Array(8);
	bigEndian.putUint64(counterBytes, counter, 0);
	const HS = hmac(SHA1, key, counterBytes);
	const truncated = truncate(HS);
	const SNum = bigEndian.uint32(truncated);
	const D = SNum % 10 ** digits;
	return D.toString().padStart(digits, "0");
}

function truncate(data: Uint8Array): Uint8Array {
	const offset = data[data.byteLength - 1] & 0x0f;
	const result = data.slice(offset, offset + 4);
	result[0] &= 0x7f;
	return result;
}

export function verifyHOTP(otp: string, key: Uint8Array, counter: bigint, digits: number): boolean {
	if (digits < 6 || digits > 8) {
		throw new TypeError("Digits must be between 6 and 8");
	}
	if (otp.length !== digits) {
		return false;
	}
	const otpChars = otp.split("");
	const rawOTP = new Uint8Array(otp.length);
	// Avoid TextEncoder since utf-8 characters have variable byte size
	for (let i = 0; i < rawOTP.byteLength; i++) {
		const digit = Number(otpChars[i]);
		if (!Number.isInteger(digit)) {
			return false;
		}
		rawOTP[i] = digit;
	}
	const expected = generateHOTP(key, counter, digits);
	const rawExpected = new Uint8Array(expected.split("").map((char) => Number(char)));
	const valid = constantTimeEqual(rawOTP, rawExpected);
	return valid;
}

export function createHOTPKeyURI(
	issuer: string,
	accountName: string,
	secret: Uint8Array,
	counter: number
): KeyURI {
	const uri = new KeyURI("hotp", issuer, accountName, secret);
	uri.params.set("counter", counter.toString());
	return uri;
}
