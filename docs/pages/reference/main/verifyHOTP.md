---
title: "verifyHOTP()"
---

Verifies an HOTP with constant-time comparison.

## Definition

```ts
function verifyHOTP(otp: string, key: Uint8Array, counter: bigint, digits: number): boolean;
```

### Parameters

- `key`: HMAC key
- `digits`
- `intervalInSeconds`
