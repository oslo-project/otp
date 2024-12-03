---
title: "verifyTOTPWithGracePeriod()"
---

Verifies a TOTP using [`verifyTOTP()`](/reference/main/verifyTOTP) with a grace period. If the grace period is 30 seconds for example, the OTP is valid if it was generated within the 30-second time span before or after the current machine time (60 seconds in total). The grace period must be smaller than or equal to the interval.

```ts
function verifyTOTPWithGracePeriod(
	key: Uint8Array,
	intervalInSeconds: number,
	digits: number,
	otp: string,
    gracePeriodInSeconds: number
): boolean;
```

### Parameters

- `key`: HMAC key
- `intervalInSeconds`
- `digits`
- `otp`
- `gracePeriodInSeconds`
