---
{
	"title": "User Meta",
	"pageTitle": "User Meta API",
	"label": "Meta"
}
---
Related
: [`UserData`](/types/users)
: [`UserMetaData`](/types/users#usermeta)
---

## Route `/users/:username/meta/:name`
```typescript
export interface Params {
	username: string
	name: string
}
```

## `GET` - `/users/:username/meta/:name`
```typescript
export type Result = UserMetaData
```

## `PATCH` - `/users/:username/meta/:name`
```typescript
export interface Body {
	value: any
	private?: boolean
}

export type Result = UserMetaData
```
