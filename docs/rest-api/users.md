---
{
	"title": "Users",
	"pageTitle": "Users API"
}
---
Related
: [`UserData`](/types/users)
: [`UserProfileData`](/types/users#userprofile)
: [`UserMetaData`](/types/users#usermeta)
---
## `GET` - `/users`
```typescript
export interface Query {
	name?: string
	email?: string
	page?: number
	limit?: number
}

export interface Result {
	total: number
	items: UserData[]
} 
```

---

## Route `/users/:username`
```typescript
export interface Params {
	username: string
}
```

## `GET` - `/users/:username`
```typescript
export type Result = UserData
``` 

## `PATCH` - `/users/:username`
```typescript
export type Body = Partial<UserData>
export type Result = UserData
``` 

## `GET` - `/users/:username/profile`
```typescript
export type Result = UserProfileData
``` 
