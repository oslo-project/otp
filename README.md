# @oslojs/otp

**Documentation: https://otp.oslojs.dev**

A JavaScript library for generating and verifying OTPs by [Oslo](https://oslojs.dev).

Supports HMAC-based one-time passwords (HOTP) and time-based one-time passwords (TOTP) as defined in [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226) and [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238).

- Runtime-agnostic
- No third-party dependencies
- Fully typed

```ts
import { generateTOTP, verifyTOTP } from "@oslojs/otp";

const totp = generateTOTP(key, 30, 6);
const valid = verifyTOTP(totp, key, 30, 6);
```

## Installation

```
npm i @oslojs/otp
```

## Prerequisites

This package requires the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API). This is available in most modern runtimes, including Node.js 20+, Deno, Bun, and Cloudflare Workers. The big exception is Node.js 16 and 18. Make sure to polyfill it using `webcrypto`.

```ts
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto;
```

Alternatively, add the `--experimental-global-webcrypto` flag when executing files.

```
node --experimental-global-webcrypto index.js
```
