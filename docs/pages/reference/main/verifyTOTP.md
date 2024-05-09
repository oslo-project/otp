---
title: "verifyTOTP()"
---

Verifies a TOTP with constant-time comparison.

## Definition

```ts
function verifyTOTP(
	otp: string,
	key: Uint8Array,
	intervalInSeconds: number,
	digits: number
): boolean;
```

### Parameters

- `key`: HMAC key
- `digits`
- `intervalInSeconds`
