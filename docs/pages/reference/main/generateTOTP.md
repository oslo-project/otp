---
title: "generateTOTP()"
---

Generates a new TOTP with SHA-1.

## Definition

```ts
function generateTOTP(key: Uint8Array, intervalInSeconds: number, digits: number): string;
```

### Parameters

- `key`: HMAC key
- `intervalInSeconds`
- `digits`
