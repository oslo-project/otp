# @oslojs/otp

A runtime-agnostic TypeScript library for working with HMAC-based one-time passwords (HOTP) and time-based one-time passwords (TOTP) as specified in [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226) and [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238) respectively.

```
npm i @oslojs/otp
```

## Prerequisites

This package requires the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API). The Web Crypto API is available in most modern runtimes, including Node.js 20+, Deno, Bun, and Cloudflare Workers. The big exception is Node.js 16 and 18. Make sure to polyfill it using `webcrypto`.

```ts
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto;
```

Alternatively, add the `--experimental-global-webcrypto` flag when executing files.

```
node --experimental-global-webcrypto index.js
```

## Examples

### HOTP

```ts
import { generateHOTP, createHOTPKeyURI } from "@oslojs/otp";

const digits = 6;
const hotp = await generateHOTP(hmacKey, counter, digits);
const uri = createHOTPKeyURI(issuer, accountName, secret, counter);
```

### TOTP

```ts
import { TOTPController } from "@oslojs/otp";

const controller = new TOTPController({
	// optional (default values)
	digits: 6,
	intervalInSeconds: 30
});
const totp = await controller.generate(hmacKey);
const valid = await controller.verify(totp, hmacKey);
const uri = controller.createKeyURI(issuer, accountName, secret);
```
