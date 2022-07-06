---
{
	"title": "AuthTokenAPIRoute",
	"label": "AuthTokenAPIRoute"
}
---
# AuthTokenAPIRoute

Related
: [`JWTModule`](/types/JWTModule)

## Body
```typescript
export interface Body {
	key: string
}
```

## Result
```typescript
export interface Result {
	token: JWTModule.Token
	user: UserData
}
```
