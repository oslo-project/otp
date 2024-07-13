---
title: "verifyTOTP()"
---

Verifies a TOTP with constant-time comparison.

## Definition

```ts
function verifyTOTP(
	key: Uint8Array,
	intervalInSeconds: number,
	digits: number,
	otp: string
): boolean;
```

### Parameters

- `key`: HMAC key
- `intervalInSeconds`
- `digits`
- `otp`
