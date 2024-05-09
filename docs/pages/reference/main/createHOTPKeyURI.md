---
title: "createHOTPKeyURI()"
---

Creates an HOTP key URI with the `issuer`, `secret`, and `counter` parameter defined.

## Definition

```ts
function createHOTPKeyURI(
	issuer: string,
	accountName: string,
	secret: Uint8Array,
	counter: bigint
): KeyURI;
```

### Parameters

- `issuer`
- `accountName`
- `secret`
- `counter`

## Example

```ts
import { createHOTPKeyURI } from "@oslojs/otp";

const uri = createHOTPKeyURI("My App", "user@example.com", secret, counter);
uri.setDigits(6);
```
