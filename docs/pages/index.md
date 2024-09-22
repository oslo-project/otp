---
title: "@oslojs/otp documentation"
---

# @oslojs/otp documentation

A JavaScript library for generating and verifying OTPs by [Oslo](https://oslojs.dev).

Supports HMAC-based one-time passwords (HOTP) and time-based one-time passwords (TOTP) using SHA-1 as defined in [RFC 4226](https://datatracker.ietf.org/doc/html/rfc4226) and [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238).

- Runtime-agnostic
- No third-party dependencies
- Fully typed

```ts
import { generateTOTP, verifyTOTP } from "@oslojs/otp";

const totp = generateTOTP(key, 30, 6);
const valid = verifyTOTP(key, 30, 6, totp);
```

## Installation

```
npm i @oslojs/otp
```
