import { base32 } from "@oslojs/encoding";

export class KeyURI {
	public type: "totp" | "hotp";
	public issuer: string;
	public accountName: string;

	public params = new URLSearchParams();

	constructor(type: "totp" | "hotp", issuer: string, accountName: string, key: Uint8Array) {
		this.type = type;
		this.issuer = issuer;
		this.accountName = accountName;
		this.params.set("issuer", issuer);
		const secret = base32.encodeNoPadding(key);
		this.params.set("secret", secret);
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

	public setCounter(counter: bigint): void {
		this.params.set("counter", counter.toString());
	}

	public setPeriodInSeconds(period: number): void {
		this.params.set("period", period.toString());
	}
}
