---
title: "Time-based one-time passwords"
---

# Time-based one-time passwords

Use [`generateTOTP()`](/reference/main/generateTOTP) to generate TOTPs and use [`verifyTOTPWithGracePeriod()`](/reference/main/verifyTOTPWithGracePeriod) or [`verifyTOTP()`](/reference/main/verifyTOTP) to verify them. Adding a grace period allows you to account for network latency and time discrepancy between devices.

```ts
import { generateTOTP, verifyTOTPWithGracePeriod, verifyTOTP } from "@oslojs/otp";

const digits = 6;
const intervalInSeconds = 30;

const otp = generateTOTP(key, intervalInSeconds, digits);
const valid = verifyTOTPWithGracePeriod(key, intervalInSeconds, digits, otp, 30);
const valid = verifyTOTP(key, intervalInSeconds, digits, otp);
```

Use [`createTOTPKeyURI()`](/reference/main/createTOTPKeyURI) to create a key URI, which are then usually encoded into a QR code.

```ts
import { createTOTPKeyURI } from "@oslojs/otp";

const issuer = "My app";
const accountName = "user@example.com";
const intervalInSeconds = 30;
const digits = 6;
const uri = createTOTPKeyURI(issuer, accountName, key, intervalInSeconds, digits);
```
