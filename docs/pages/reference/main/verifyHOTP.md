---
title: "verifyHOTP()"
---

Verifies an HOTP with constant-time comparison.

## Definition

```ts
function verifyHOTP(key: Uint8Array, counter: bigint, digits: number, otp: string): boolean;
```

### Parameters

- `key`: HMAC key
- `counter`
- `digits`
- `otp`
