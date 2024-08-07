import { expect } from "vitest";
import { test } from "vitest";
import { generateHOTP, verifyHOTP } from "./hotp.js";

const secret = new Uint8Array([
	0x63, 0x07, 0x87, 0x06, 0xe4, 0x89, 0x1b, 0x07, 0x85, 0xba, 0x42, 0xbd, 0x23, 0xac, 0xdd, 0x09,
	0xe4, 0x69, 0x33, 0x63, 0xbe, 0xfa, 0x25, 0xa4, 0x13, 0x46, 0xee, 0x0b, 0xda, 0xb0, 0x72, 0x4c,
	0xa0, 0x8f, 0x8d, 0x26, 0x63, 0x0e, 0xb5, 0x6c, 0xa3, 0xfd, 0xce, 0x6c, 0xc0, 0x0e, 0xf8, 0x65,
	0x6d, 0x1f, 0xeb, 0xc7, 0x35, 0x92, 0x87, 0x16, 0x3d, 0x11, 0x34, 0x20, 0x00, 0x7a, 0x18, 0x1c
]);

test("generateHOTP()", () => {
	expect(generateHOTP(secret, 0n, 6)).toBe("173573");
	expect(generateHOTP(secret, 10n, 6)).toBe("110880");
	expect(generateHOTP(secret, 100n, 6)).toBe("020803");
	expect(generateHOTP(secret, 1000n, 6)).toBe("115716");
});

test("verifyHOTP()", () => {
	expect(verifyHOTP(secret, 0n, 6, "173573")).toBe(true);
	expect(verifyHOTP(secret, 0n, 6, "000000")).toBe(false);
	expect(verifyHOTP(secret, 10n, 6, "110880")).toBe(true);
	expect(verifyHOTP(secret, 10n, 6, "000000")).toBe(false);
	expect(verifyHOTP(secret, 100n, 6, "020803")).toBe(true);
	expect(verifyHOTP(secret, 100n, 6, "000000")).toBe(false);
	expect(verifyHOTP(secret, 1000n, 6, "115716")).toBe(true);
	expect(verifyHOTP(secret, 1000n, 6, "000000")).toBe(false);

	expect(verifyHOTP(secret, 0n, 8, "173573")).toBe(false);
});
