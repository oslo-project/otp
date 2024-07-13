---
title: "HMAC-based one-time passwords"
---

# HMAC-based one-time passwords

Use [`generateHOTP()`](/reference/main/generateHOTP) and [`verifyHOTP()`](/reference/main/verifyHOTP) to generate and verify HOTPs.

```ts
import { generateHOTP, verifyHOTP } from "@oslojs/otp";

const digits = 6;
let counter = 10n;

const otp = generateHOTP(key, counter, digits);
const validOTP = verifyOTP(key, counter, digits, otp);
```

Use [`createHOTPKeyURI()`](/reference/main/createHOTPKeyURI) to create a key URI, which are then usually encoded into a QR code.

```ts
import { createHOTPKeyURI } from "@oslojs/otp";

const issuer = "My app";
const accountName = "user@example.com";
const digits = 6;
const uri = createHOTPKeyURI(issuer, accountName, key, counter, digits);
```
