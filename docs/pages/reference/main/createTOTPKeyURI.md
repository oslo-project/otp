---
title: "createTOTPKeyURI()"
---

Creates an TOTP key URI with the algorithm parameter set to `SHA1`.

## Definition

```ts
function createTOTPKeyURI(
	issuer: string,
	accountName: string,
	key: Uint8Array,
	periodInSeconds: number,
	digits: number
): string;
```

### Parameters

- `issuer`
- `accountName`
- `key`
- `periodInSeconds`
- `digits`

## Example

```ts
import { createTOTPKeyURI } from "@oslojs/otp";

const uri = createTOTPKeyURI("My App", "user@example.com", key, 30, 6);
```
