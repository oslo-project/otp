import { generateHOTP } from "./hotp.js";
import { createTOTPKeyURI } from "./uri.js";

import type { KeyURI } from "./uri.js";

export class TOTPController {
	public digits: number;
	public intervalInSeconds: number;

	constructor(options?: { digits?: number; intervalInSeconds?: number }) {
		const digits = options?.digits ?? 6;
		if (digits < 6 || digits > 8) {
			throw new TypeError("Digits must be between 6 and 8");
		}
		this.digits = digits;
		this.intervalInSeconds = options?.intervalInSeconds ?? 30;
	}

	public generate(secret: Uint8Array): string {
		const counter = BigInt(Math.floor(Date.now() / (this.intervalInSeconds * 1000)));
		const hotp = generateHOTP(secret, counter, this.digits);
		return hotp;
	}

	public verify(totp: string, secret: Uint8Array): boolean {
		const expectedTOTP = this.generate(secret);
		return totp === expectedTOTP;
	}

	public createKeyURI(issuer: string, accountName: string, secret: Uint8Array): KeyURI {
		const uri = createTOTPKeyURI(issuer, accountName, secret);
		uri.setDigits(this.digits);
		uri.setPeriod(this.intervalInSeconds);
		return uri;
	}
}
