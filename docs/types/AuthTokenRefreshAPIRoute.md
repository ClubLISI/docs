---
{
	"title": "AuthTokenRefreshAPIRoute",
	"label": "AuthTokenRefreshAPIRoute"
}
---
Related
: [`JWTModule`](/types/JWTModule)

---

## Body
```typescript
export interface Body {
	token: JWTModule.Token
}
```

## Result
```typescript
export type Result = JWTModule.Token
```
