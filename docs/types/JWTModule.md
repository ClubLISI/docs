---
{
	"title": "JWTModule",
	"label": "JWTModule"
}
---
# JWTModule

## Config
```typescript
export interface Config {
	secret: string
}
```

## Params
```typescript
export interface Params {
	issuer?: string
	subject?: string
	audience?: string | string[]
}
```

## GenerateParams
```typescript
export interface GenerateParams<Input = string | object> extends Params {
	input: Input
	expiresIn?: string | number
	notBefore?: string | number
}
```

## Token
```typescript
export interface Token {
	issuer?: string
	subject?: string
	audience?: string | string[]
	expires?: number
	issued?: number
	signature: string
}
```

## Payload
```typescript
export interface Payload<Data = any> {
	data: GenerateParams<Data>
	issuer?: string
	subject?: string
	audience?: string | string[]
	expires?: number
	issued?: number
}
```

## VerifyParams
```typescript
export interface VerifyParams extends Params {
	token: string
}
```
