---
{
	"title": "AuthTokenAPIRoute",
	"label": "AuthTokenAPIRoute"
}
---
Related
: [`JWTModule`](/types/JWTModule)
: [`UserData`](/types/UserData)

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
