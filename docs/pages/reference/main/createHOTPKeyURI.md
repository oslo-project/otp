---
title: "createHOTPKeyURI()"
---

Creates an HOTP key URI with the algorithm parameter set to `SHA1`.

## Definition

```ts
function createHOTPKeyURI(
	issuer: string,
	accountName: string,
	key: Uint8Array,
	counter: bigint,
	digits: number
): string;
```

### Parameters

- `issuer`
- `key`
- `key`
- `counter`
- `digits`

## Example

```ts
import { createHOTPKeyURI } from "@oslojs/otp";

const uri = createHOTPKeyURI("My App", "user@example.com", key, counter, 6);
```
