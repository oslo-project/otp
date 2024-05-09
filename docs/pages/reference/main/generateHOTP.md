---
title: "generateHOTP()"
---

Generates a new HOTP.

## Definition

```ts
function generateHOTP(key: Uint8Array, counter: bigint, digits: number): string;
```

### Parameters

- `key`: HMAC key
- `counter`
- `digits`
