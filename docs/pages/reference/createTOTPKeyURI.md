---
title: "createTOTPKeyURI()"
---

Creates a TOTP key URI with the `issuer` and `secret` parameter defined.

## Definition

```ts
function createTOTPKeyURI(issuer: string, accountName: string, secret: Uint8Array): KeyURI;
```

### Parameters

- `issuer`
- `accountName`
- `secret`

## Example

```ts
import { createTOTPKeyURI } from "@oslojs/otp";

const uri = createTOTPKeyURI("My App", "user@example.com", secret);
uri.setDigits(6);
uri.setPeriodInSeconds(30);
```
