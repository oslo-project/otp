import { base32 } from "@oslojs/encoding";

export class KeyURI {
	public type: "totp" | "hotp";
	public issuer: string;
	public accountName: string;

	public params = new URLSearchParams();

	constructor(type: "totp" | "hotp", issuer: string, accountName: string, secret: Uint8Array) {
		this.type = type;
		this.issuer = issuer;
		this.accountName = accountName;
		this.params.set("issuer", issuer);
		const encodedSecret = base32.encode(secret, {
			includePadding: false
		});
		this.params.set("secret", encodedSecret);
	}

	public toString(): string {
		const encodedIssuer = encodeURIComponent(this.issuer);
		const encodedAccountName = encodeURIComponent(this.accountName);
		const baseURI = `otpauth://${this.type}/${encodedIssuer}:${encodedAccountName}`;
		return baseURI + "?" + this.params.toString();
	}

	public setDigits(digits: number): void {
		this.params.set("digits", digits.toString());
	}

	public setAlgorithm(algorithm: "SHA-1" | "SHA-256" | "SHA-512"): void {
		this.params.set("algorithm", algorithm);
	}

	public setCounter(counter: number): void {
		this.params.set("counter", counter.toString());
	}

	public setPeriod(period: number): void {
		this.params.set("period", period.toString());
	}
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

export function createTOTPKeyURI(issuer: string, accountName: string, secret: Uint8Array): KeyURI {
	const uri = new KeyURI("totp", issuer, accountName, secret);
	return uri;
}
