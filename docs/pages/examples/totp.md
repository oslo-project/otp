---
title: "Time-based one-time passwords"
---

# Time-based one-time passwords

Use [`generateTOTP()`](/reference/main/generateTOTP) and [`verifyTOTP()`](/reference/main/verifyTOTP) to generate and verify HOTPs.

```ts
import { generateTOTP, verifyTOTP } from "@oslojs/otp";

const digits = 6;
const intervalInSeconds = 30;

const otp = generateTOTP(key, intervalInSeconds, digits);
const validOTP = verifyTOTP(otp, key, intervalInSeconds, digits);
```

Use [`createTOTPKeyURI()`](/reference/main/createTOTPKeyURI) to create a key URI, which are then usually encoded into a QR code.

```ts
import { createTOTPKeyURI } from "@oslojs/otp";

const issuer = "My app";
const accountName = "user@example.com";
const uri = createTOTPKeyURI(issuer, accountName, key);
uri.setDigits(6);
uri.setPeriodInSeconds(30);
```
