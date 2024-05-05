import { bigEndian } from "@oslojs/binary";
import { hmac } from "@oslojs/crypto/hmac";
import { SHA1 } from "@oslojs/crypto/sha1";

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
