---
title: "KeyURI"
---

# Key URI

Represents a [key URI](https://github.com/google/google-authenticator/wiki/Key-Uri-Format). On initialization, sets the `issuer` and `secret` parameters.

## Constructor

```ts
function constructor(
	type: "totp" | "hotp",
	issuer: string,
	accountName: string,
	key: Uint8Array
): this;
```

### Parameters

- `type`
- `issuer`
- `accountName`
- `key`

## Methods

- [`setAlgorithm()`](/reference/main/KeyURI/setAlgorithm)
- [`setCounter()`](/reference/main/KeyURI/setCounter)
- [`setDigits()`](/reference/main/KeyURI/setDigits)
- [`setPeriodInSeconds()`](/reference/main/KeyURI/etPeriodInSeconds)
- [`toString()`](/reference/main/KeyURI/toString)