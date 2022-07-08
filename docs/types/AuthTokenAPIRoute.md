---
{
	"title": "AuthTokenAPIRoute",
	"label": "AuthTokenAPIRoute"
}
---
Related
: [`JWTModule`](/types/JWTModule)
: [`UserData`](/types/users)

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
