import { bigEndian } from "@oslojs/binary";
import { hmac } from "@oslojs/crypto/hmac";
import { SHA1 } from "@oslojs/crypto/sha1";
import { constantTimeEqual } from "@oslojs/crypto/subtle";
import { base32 } from "@oslojs/encoding";

export function generateHOTP(key: Uint8Array, counter: bigint, digits: number): string {
	if (digits < 6 || digits > 8) {
		throw new TypeError("Digits must be between 6 and 8");
	}
	const counterBytes = new Uint8Array(8);
	bigEndian.putUint64(counterBytes, counter, 0);
	const HS = hmac(SHA1, key, counterBytes);
	const offset = HS[HS.byteLength - 1] & 0x0f;
	const truncated = HS.slice(offset, offset + 4);
	truncated[0] &= 0x7f;
	const SNum = bigEndian.uint32(truncated, 0);
	const D = SNum % 10 ** digits;
	return D.toString().padStart(digits, "0");
}

export function verifyHOTP(key: Uint8Array, counter: bigint, digits: number, otp: string): boolean {
	if (digits < 6 || digits > 8) {
		throw new TypeError("Digits must be between 6 and 8");
	}
	if (otp.length !== digits) {
		return false;
	}
	const bytes = new TextEncoder().encode(otp);
	const expected = generateHOTP(key, counter, digits);
	const expectedBytes = new TextEncoder().encode(expected);
	const valid = constantTimeEqual(bytes, expectedBytes);
	return valid;
}

export function createHOTPKeyURI(
	issuer: string,
	accountName: string,
	key: Uint8Array,
	counter: bigint,
	digits: number
): string {
	const encodedIssuer = encodeURIComponent(issuer);
	const encodedAccountName = encodeURIComponent(accountName);
	const base = `otpauth://hotp/${encodedIssuer}:${encodedAccountName}`;
	const params = new URLSearchParams();
	params.set("issuer", issuer);
	params.set("algorithm", "SHA1");
	params.set("secret", base32.encodeNoPadding(key));
	params.set("counter", counter.toString());
	params.set("digits", digits.toString());
	return base + "?" + params.toString();
}
